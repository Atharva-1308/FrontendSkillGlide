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
      // For demo purposes, return mock data
      return [
        {
          id: 1,
          title: "Senior Frontend Developer",
          description: "We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.",
          location: "Bangalore, India",
          job_type: "full-time",
          work_mode: "hybrid",
          experience_level: "3-5",
          requirements: ["React", "TypeScript", "3+ years experience"],
          responsibilities: ["Develop user interfaces", "Collaborate with team", "Code reviews"],
          benefits: ["Health insurance", "Flexible hours", "Remote work"],
          skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
          salary_min: 80000,
          salary_max: 120000,
          salary_currency: "INR",
          salary_period: "month",
          is_active: true,
          is_featured: true,
          employer_id: 1,
          company_id: 1,
          created_at: "2024-01-15T10:00:00Z",
          applications_count: 15
        },
        {
          id: 2,
          title: "Product Manager",
          description: "Lead product strategy and development for our core platform. Work with cross-functional teams to deliver exceptional products.",
          location: "Mumbai, India",
          job_type: "full-time",
          work_mode: "remote",
          experience_level: "5+",
          requirements: ["Product Management", "Agile", "Analytics", "5+ years experience"],
          responsibilities: ["Define product roadmap", "Work with engineering", "Analyze metrics"],
          benefits: ["Competitive salary", "Stock options", "Learning budget"],
          skills: ["Product Strategy", "Analytics", "User Research", "Agile", "Leadership"],
          salary_min: 150000,
          salary_max: 200000,
          salary_currency: "INR",
          salary_period: "month",
          is_active: true,
          is_featured: false,
          employer_id: 2,
          company_id: 2,
          created_at: "2024-01-14T09:00:00Z",
          applications_count: 8
        },
        {
          id: 3,
          title: "UX Designer",
          description: "Create beautiful and intuitive user experiences. Work closely with product and engineering teams.",
          location: "Remote",
          job_type: "full-time",
          work_mode: "remote",
          experience_level: "3-5",
          requirements: ["UI/UX Design", "Figma", "User Research", "3+ years experience"],
          responsibilities: ["Design user interfaces", "Conduct user research", "Create prototypes"],
          benefits: ["Remote work", "Flexible hours", "Design tools budget"],
          skills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"],
          salary_min: 70000,
          salary_max: 100000,
          salary_currency: "INR",
          salary_period: "month",
          is_active: true,
          is_featured: false,
          employer_id: 3,
          company_id: 3,
          created_at: "2024-01-13T14:00:00Z",
          applications_count: 22
        },
        {
          id: 4,
          title: "Backend Developer",
          description: "Build scalable backend systems and APIs. Work with modern technologies and cloud platforms.",
          location: "Delhi, India",
          job_type: "full-time",
          work_mode: "onsite",
          experience_level: "1-2",
          requirements: ["Node.js", "Python", "Database design", "2+ years experience"],
          responsibilities: ["Develop APIs", "Database optimization", "System architecture"],
          benefits: ["Health insurance", "Learning opportunities", "Career growth"],
          skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
          salary_min: 60000,
          salary_max: 90000,
          salary_currency: "INR",
          salary_period: "month",
          is_active: true,
          is_featured: true,
          employer_id: 4,
          company_id: 4,
          created_at: "2024-01-12T11:00:00Z",
          applications_count: 31
        },
        {
          id: 5,
          title: "Data Scientist",
          description: "Analyze complex data sets and build machine learning models to drive business insights.",
          location: "Hyderabad, India",
          job_type: "full-time",
          work_mode: "hybrid",
          experience_level: "3-5",
          requirements: ["Python", "Machine Learning", "Statistics", "3+ years experience"],
          responsibilities: ["Build ML models", "Data analysis", "Present insights"],
          benefits: ["Research time", "Conference budget", "Flexible schedule"],
          skills: ["Python", "TensorFlow", "Pandas", "SQL", "Statistics"],
          salary_min: 100000,
          salary_max: 150000,
          salary_currency: "INR",
          salary_period: "month",
          is_active: true,
          is_featured: false,
          employer_id: 5,
          company_id: 5,
          created_at: "2024-01-11T16:00:00Z",
          applications_count: 12
        }
      ];
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
}

export const jobService = new JobService();