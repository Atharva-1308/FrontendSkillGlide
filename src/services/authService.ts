import { api } from './api';
import type { User } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
  phone?: string;
  location?: string;
  company?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  new_password: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { access_token, refresh_token, user } = response.data;
      
      // Store tokens and user data
      localStorage.setItem('skillglide-access-token', access_token);
      localStorage.setItem('skillglide-refresh-token', refresh_token);
      localStorage.setItem('skillglide-user', JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      const { access_token, refresh_token, user } = response.data;
      
      // Store tokens and user data
      localStorage.setItem('skillglide-access-token', access_token);
      localStorage.setItem('skillglide-refresh-token', refresh_token);
      localStorage.setItem('skillglide-user', JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('skillglide-refresh-token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<AuthResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken, user } = response.data;
      
      localStorage.setItem('skillglide-access-token', access_token);
      localStorage.setItem('skillglide-refresh-token', newRefreshToken);
      localStorage.setItem('skillglide-user', JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      this.logout();
      throw new Error(error.response?.data?.detail || 'Token refresh failed');
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await api.post('/auth/password-reset', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Password reset request failed');
    }
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    try {
      await api.post('/auth/password-reset/confirm', data);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Password reset failed');
    }
  }

  logout(): void {
    localStorage.removeItem('skillglide-access-token');
    localStorage.removeItem('skillglide-refresh-token');
    localStorage.removeItem('skillglide-user');
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('skillglide-user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('skillglide-access-token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();