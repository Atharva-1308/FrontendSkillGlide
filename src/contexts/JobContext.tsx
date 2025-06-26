import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Job, JobFilters } from '../types';

interface JobContextValue {
  jobs: Job[];
  filteredJobs: Job[];
  filters: JobFilters;
  updateFilters: (filters: Partial<JobFilters>) => void;
  clearFilters: () => void;
  searchJobs: (query: string) => void;
  loading: boolean;
  totalJobs: number;
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

// Mock job data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Bangalore, India',
    type: 'full-time',
    workMode: 'hybrid',
    experience: '3-5',
    salary: { min: 80000, max: 120000, currency: 'INR', period: 'month' },
    description: 'We are looking for a skilled Frontend Developer to join our team...',
    requirements: ['React', 'TypeScript', 'Next.js', '3+ years experience'],
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    employerId: 'emp1',
    isActive: true,
    applicationsCount: 15,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Mumbai, India',
    type: 'full-time',
    workMode: 'remote',
    experience: '5+',
    salary: { min: 150000, max: 200000, currency: 'INR', period: 'month' },
    description: 'Lead product strategy and development for our core platform...',
    requirements: ['Product Management', 'Agile', 'Analytics', '5+ years experience'],
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    employerId: 'emp2',
    isActive: true,
    applicationsCount: 8,
  },
  {
    id: '3',
    title: 'Marketing Intern',
    company: 'GrowthCo',
    location: 'Delhi, India',
    type: 'internship',
    workMode: 'onsite',
    experience: 'fresher',
    salary: { min: 15000, max: 25000, currency: 'INR', period: 'month' },
    description: 'Join our marketing team and learn digital marketing strategies...',
    requirements: ['Marketing basics', 'Social Media', 'Content Writing'],
    skills: ['Digital Marketing', 'Content Creation', 'Social Media'],
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    employerId: 'emp3',
    isActive: true,
    applicationsCount: 25,
  },
];

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<JobFilters>({});
  const [loading, setLoading] = useState(false);

  const applyFilters = (currentJobs: Job[], currentFilters: JobFilters) => {
    let filtered = [...currentJobs];

    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    if (currentFilters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(currentFilters.location!.toLowerCase())
      );
    }

    if (currentFilters.jobType && currentFilters.jobType.length > 0) {
      filtered = filtered.filter(job => currentFilters.jobType!.includes(job.type));
    }

    if (currentFilters.workMode && currentFilters.workMode.length > 0) {
      filtered = filtered.filter(job => currentFilters.workMode!.includes(job.workMode));
    }

    if (currentFilters.experience && currentFilters.experience.length > 0) {
      filtered = filtered.filter(job => currentFilters.experience!.includes(job.experience));
    }

    if (currentFilters.postedWithin) {
      const cutoffDate = new Date(Date.now() - currentFilters.postedWithin * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(job => job.postedAt >= cutoffDate);
    }

    if (currentFilters.skills && currentFilters.skills.length > 0) {
      filtered = filtered.filter(job =>
        currentFilters.skills!.some(skill =>
          job.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    return filtered;
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = applyFilters(jobs, filters);
      setFilteredJobs(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
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
        jobs,
        filteredJobs,
        filters,
        updateFilters,
        clearFilters,
        searchJobs,
        loading,
        totalJobs: jobs.length,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};