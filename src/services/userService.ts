import { api } from './api';
import type { User } from '../types';

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
      // For demo purposes, return the user from localStorage
      const userStr = localStorage.getItem('skillglide-user');
      if (!userStr) {
        throw new Error('User not found');
      }
      
      return JSON.parse(userStr);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user profile');
    }
  }
}

export const userService = new UserService();