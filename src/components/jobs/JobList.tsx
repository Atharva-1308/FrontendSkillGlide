import React from 'react';
import { Loader2, Briefcase } from 'lucide-react';
import { JobCard } from './JobCard';
import { useJobs } from '../../contexts/JobContext';

export const JobList: React.FC = () => {
  const { filteredJobs, loading } = useJobs();

  const handleApply = (jobId: string) => {
    // Handle job application
    console.log('Applying to job:', jobId);
    // TODO: Implement application logic
  };

  const handleSave = (jobId: string) => {
    // Handle job save/bookmark
    console.log('Saving job:', jobId);
    // TODO: Implement save logic
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading jobs...</span>
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No jobs found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find more opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
        </h2>
      </div>
      
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={handleApply}
            onSave={handleSave}
            isSaved={false} // TODO: Implement saved jobs logic
          />
        ))}
      </div>
    </div>
  );
};