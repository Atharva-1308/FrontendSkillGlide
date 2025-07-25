import { api } from './api';
import type { JobFilters } from '../types';

export interface JobResponse {
  id: number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  work_mode: string;
  experience_level: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  salary_period: string;
  application_deadline?: string;
  is_active: boolean;
  is_featured: boolean;
  employer_id: number;
  company_id?: number;
  created_at: string;
  updated_at?: string;
  applications_count: number;
}

class JobService {
  async getJobs(filters?: Partial<JobFilters>): Promise<JobResponse[]> {
    try {
      const response = await api.get<JobResponse[]>('/jobs', filters);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('Error fetching jobs:', error.message || error);
      // Log more details for debugging
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error - check if backend is running on http://127.0.0.1:8000');
      }
      return []; // Return empty array instead of throwing
    }
  }

  async getJob(jobId: number): Promise<JobResponse> {
    try {
      const response = await api.get<JobResponse>(`/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to fetch job details';
      throw new Error(errorMessage);
    }
  }

  async applyForJob(jobId: number, data: any): Promise<any> {
    try {
      const response = await api.post(`/jobs/${jobId}/apply`, data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to apply for job';
      throw new Error(errorMessage);
    }
  }

  async getMyApplications(): Promise<any[]> {
    try {
      const response = await api.get('/jobs/applications/me');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      return [];
    }
  }
}

export const jobService = new JobService();