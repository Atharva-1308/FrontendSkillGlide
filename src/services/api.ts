import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_VERSION = '/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skillglide-access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('skillglide-refresh-token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}${API_VERSION}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: newRefreshToken } = response.data;
          localStorage.setItem('skillglide-access-token', access_token);
          localStorage.setItem('skillglide-refresh-token', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('skillglide-access-token');
        localStorage.removeItem('skillglide-refresh-token');
        localStorage.removeItem('skillglide-user');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T = any>(url: string, params?: any): Promise<AxiosResponse<T>> =>
    apiClient.get(url, { params }),
  
  post: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data),
  
  put: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data),
  
  patch: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data),
  
  delete: <T = any>(url: string): Promise<AxiosResponse<T>> =>
    apiClient.delete(url),
  
  upload: <T = any>(url: string, formData: FormData): Promise<AxiosResponse<T>> =>
    apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default apiClient;