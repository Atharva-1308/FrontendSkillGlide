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

class AuthService {
  async login(email: string, password: string, role: 'jobseeker' | 'employer'): Promise<AuthResponse> {
    try {
      // For demo purposes, use mock data for specific accounts
      if (email === 'john.doe@skillglide.com' && password === 'password123' && role === 'jobseeker') {
        const mockResponse: AuthResponse = {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          token_type: 'bearer',
          user: {
            id: 1,
            email: 'john.doe@skillglide.com',
            name: 'John Doe',
            role: 'jobseeker',
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            experience_years: 3,
            is_active: true,
            is_verified: true,
            email_verified: true,
            created_at: '2024-01-15T00:00:00Z'
          }
        };
        
        localStorage.setItem('skillglide-access-token', mockResponse.access_token);
        localStorage.setItem('skillglide-refresh-token', mockResponse.refresh_token);
        localStorage.setItem('skillglide-user', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      if (email === 'hr@techcorp.com' && password === 'employer123' && role === 'employer') {
        const mockResponse: AuthResponse = {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          token_type: 'bearer',
          user: {
            id: 2,
            email: 'hr@techcorp.com',
            name: 'Sarah Wilson',
            role: 'employer',
            company: 'TechCorp Solutions',
            is_active: true,
            is_verified: true,
            email_verified: true,
            created_at: '2024-01-10T00:00:00Z'
          }
        };
        
        localStorage.setItem('skillglide-access-token', mockResponse.access_token);
        localStorage.setItem('skillglide-refresh-token', mockResponse.refresh_token);
        localStorage.setItem('skillglide-user', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      }
      
      // If not a demo account, try the API
      const response = await api.post<AuthResponse>('/auth/login', { email, password, role });
      const { access_token, refresh_token, user } = response.data;
      
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
      // For demo purposes, create a mock response
      const mockResponse: AuthResponse = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        token_type: 'bearer',
        user: {
          id: Math.floor(Math.random() * 1000) + 10,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
          location: userData.location,
          is_active: true,
          is_verified: false,
          email_verified: false,
          created_at: new Date().toISOString()
        }
      };
      
      localStorage.setItem('skillglide-access-token', mockResponse.access_token);
      localStorage.setItem('skillglide-refresh-token', mockResponse.refresh_token);
      localStorage.setItem('skillglide-user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
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