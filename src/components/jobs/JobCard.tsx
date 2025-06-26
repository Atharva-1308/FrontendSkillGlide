import React from 'react';
import { MapPin, Clock, Users, DollarSign, Bookmark, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  onSave,
  isSaved = false,
}) => {
  const formatSalary = (salary: Job['salary']) => {
    const { min, max, currency, period } = salary;
    const format = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }
      return amount.toLocaleString();
    };
    
    return `${currency === 'INR' ? '₹' : '$'}${format(min)} - ${format(max)}/${period}`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  const getWorkModeColor = (mode: Job['workMode']) => {
    switch (mode) {
      case 'remote': return 'success';
      case 'hybrid': return 'primary';
      case 'onsite': return 'secondary';
      default: return 'default';
    }
  };

  const getJobTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time': return 'primary';
      case 'part-time': return 'secondary';
      case 'internship': return 'warning';
      case 'contract': return 'outline';
      case 'freelance': return 'success';
      default: return 'default';
    }
  };

  const isNewJob = () => {
    const daysSincePosted = Math.floor((new Date().getTime() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysSincePosted <= 1;
  };

  const isTrending = () => {
    return job.applicationsCount > 20;
  };

  return (
    <Card hover className="group relative overflow-hidden border-l-4 border-l-transparent hover:border-l-blue-500 dark:hover:border-l-cyan-400 transition-all duration-300">
      {/* New/Trending Indicators */}
      <div className="absolute top-4 left-4 flex space-x-2">
        {isNewJob() && (
          <Badge variant="success" size="sm" gradient>
            <Star className="w-3 h-3 mr-1" />
            New
          </Badge>
        )}
        {isTrending() && (
          <Badge variant="warning" size="sm" gradient>
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6 pt-2">
        <div className="flex items-start space-x-4 flex-1">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">
                {job.company.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
              {job.company}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSave?.(job.id)}
          className={`transition-all duration-200 ${isSaved ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-400'}`}
          icon={
            <Bookmark
              className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
            />
          }
        />
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm font-medium">{job.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
          <span className="text-sm font-medium">{formatSalary(job.salary)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4 mr-2 text-purple-500" />
          <span className="text-sm font-medium">{job.experience} years exp</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2 text-orange-500" />
          <span className="text-sm font-medium">{getTimeAgo(job.postedAt)}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant={getJobTypeColor(job.type)} size="sm" gradient>
          {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
        <Badge variant={getWorkModeColor(job.workMode)} size="sm" gradient>
          {job.workMode.replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" size="sm" className="hover:bg-gray-50 dark:hover:bg-gray-800">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>
      </div>

      {/* Description Preview */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span className="font-medium">{job.applicationsCount} applicants</span>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<ExternalLink className="w-4 h-4" />}
            className="hover:scale-105"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onApply?.(job.id)}
            className="hover:scale-105 shadow-lg"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
    </Card>
  );
};