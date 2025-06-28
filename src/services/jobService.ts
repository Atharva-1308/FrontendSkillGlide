import { api } from './api';
import type { Job, JobFilters } from '../types';

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

export interface JobCreateRequest {
  title: string;
  description: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
  work_mode: 'remote' | 'onsite' | 'hybrid';
  experience_level: 'fresher' | '1-2' | '3-5' | '5+';
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  skills?: string[];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  salary_period?: string;
  application_deadline?: string;
  company_id?: number;
}

export interface JobApplicationRequest {
  job_id: number;
  cover_letter?: string;
  resume_url?: string;
  video_resume_url?: string;
  voice_resume_url?: string;
}

export interface JobApplicationResponse {
  id: number;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  cover_letter?: string;
  resume_url?: string;
  video_resume_url?: string;
  voice_resume_url?: string;
  applied_at: string;
  reviewed_at?: string;
  interview_scheduled_at?: string;
  user_id: number;
  job_id: number;
}

class JobService {
  async getJobs(filters?: Partial<JobFilters>): Promise<JobResponse[]> {
    try {
      const response = await api.get<JobResponse[]>('/jobs/', filters);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch jobs');
    }
  }

  async getJob(jobId: number): Promise<JobResponse> {
    try {
      const response = await api.get<JobResponse>(`/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch job');
    }
  }

  async createJob(jobData: JobCreateRequest): Promise<JobResponse> {
    try {
      const response = await api.post<JobResponse>('/jobs/', jobData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create job');
    }
  }

  async updateJob(jobId: number, jobData: Partial<JobCreateRequest>): Promise<JobResponse> {
    try {
      const response = await api.put<JobResponse>(`/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update job');
    }
  }

  async deleteJob(jobId: number): Promise<void> {
    try {
      await api.delete(`/jobs/${jobId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete job');
    }
  }

  async applyToJob(applicationData: JobApplicationRequest): Promise<JobApplicationResponse> {
    try {
      const response = await api.post<JobApplicationResponse>(`/jobs/${applicationData.job_id}/apply`, applicationData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to apply to job');
    }
  }

  async getMyApplications(): Promise<JobApplicationResponse[]> {
    try {
      const response = await api.get<JobApplicationResponse[]>('/jobs/applications/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch applications');
    }
  }

  async getJobApplications(jobId: number): Promise<JobApplicationResponse[]> {
    try {
      const response = await api.get<JobApplicationResponse[]>(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch job applications');
    }
  }

  async updateApplicationStatus(
    applicationId: number, 
    status: JobApplicationResponse['status']
  ): Promise<JobApplicationResponse> {
    try {
      const response = await api.patch<JobApplicationResponse>(`/jobs/applications/${applicationId}`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update application status');
    }
  }
}

export const jobService = new JobService();