import React, { createContext, useContext, useState, useEffect } from 'react';
import { jobService, type JobResponse } from '../services/jobService';
import { useApi } from '../hooks/useApi';
import type { JobFilters } from '../types';

interface JobContextValue {
  jobs: JobResponse[];
  filteredJobs: JobResponse[];
  filters: JobFilters;
  updateFilters: (filters: Partial<JobFilters>) => void;
  clearFilters: () => void;
  searchJobs: (query: string) => void;
  loading: boolean;
  error: string | null;
  totalJobs: number;
  refetchJobs: () => Promise<void>;
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: React.ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<JobFilters>({});
  const [filteredJobs, setFilteredJobs] = useState<JobResponse[]>([]);

  const {
    data: jobs = [],
    loading,
    error,
    refetch: refetchJobs,
  } = useApi(() => jobService.getJobs(filters), {
    immediate: true,
  });

  // Apply filters whenever jobs or filters change
  useEffect(() => {
    if (!jobs) return;

    let filtered = [...jobs];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Apply job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      filtered = filtered.filter(job => filters.jobType!.includes(job.job_type as any));
    }

    // Apply work mode filter
    if (filters.workMode && filters.workMode.length > 0) {
      filtered = filtered.filter(job => filters.workMode!.includes(job.work_mode as any));
    }

    // Apply experience filter
    if (filters.experience && filters.experience.length > 0) {
      filtered = filtered.filter(job => filters.experience!.includes(job.experience_level as any));
    }

    // Apply salary filter
    if (filters.salaryRange) {
      filtered = filtered.filter(job => {
        if (!job.salary_min || !job.salary_max) return true;
        return (
          job.salary_min >= (filters.salaryRange!.min || 0) &&
          job.salary_max <= (filters.salaryRange!.max || Infinity)
        );
      });
    }

    // Apply posted within filter
    if (filters.postedWithin) {
      const cutoffDate = new Date(Date.now() - filters.postedWithin * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(job => new Date(job.created_at) >= cutoffDate);
    }

    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(job =>
        filters.skills!.some(skill =>
          job.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const searchJobs = (query: string) => {
    updateFilters({ search: query });
  };

  return (
    <JobContext.Provider
      value={{
        jobs: jobs || [],
        filteredJobs,
        filters,
        updateFilters,
        clearFilters,
        searchJobs,
        loading,
        error,
        totalJobs: jobs?.length || 0,
        refetchJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};