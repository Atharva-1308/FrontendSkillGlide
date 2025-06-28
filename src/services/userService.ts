import { api } from './api';
import type { User } from '../types';

export interface UserUpdateRequest {
  name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  experience_years?: number;
  expected_salary_min?: number;
  expected_salary_max?: number;
  preferred_job_type?: string;
  preferred_work_mode?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

export interface UserResponse extends User {
  id: number;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer';
  phone?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  experience_years?: number;
  expected_salary_min?: number;
  expected_salary_max?: number;
  preferred_job_type?: string;
  preferred_work_mode?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  is_active: boolean;
  is_verified: boolean;
  email_verified: boolean;
  created_at: string;
  last_login?: string;
}

class UserService {
  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await api.get<UserResponse>('/users/me');
      
      // Update local storage with fresh user data
      localStorage.setItem('skillglide-user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user profile');
    }
  }

  async updateProfile(userData: UserUpdateRequest): Promise<UserResponse> {
    try {
      const response = await api.put<UserResponse>('/users/me', userData);
      
      // Update local storage with updated user data
      localStorage.setItem('skillglide-user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update profile');
    }
  }

  async uploadAvatar(file: File): Promise<{ avatar_url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.upload<{ avatar_url: string }>('/upload/avatar', formData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to upload avatar');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/users/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to change password');
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await api.delete('/users/me');
      
      // Clear local storage
      localStorage.removeItem('skillglide-access-token');
      localStorage.removeItem('skillglide-refresh-token');
      localStorage.removeItem('skillglide-user');
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete account');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post('/users/verify-email', { token });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to verify email');
    }
  }

  async resendVerificationEmail(): Promise<void> {
    try {
      await api.post('/users/resend-verification');
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to resend verification email');
    }
  }
}

export const userService = new UserService();