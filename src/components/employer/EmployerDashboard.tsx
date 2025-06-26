import React from 'react';
import { Plus, Users, Briefcase, Eye, TrendingUp, Calendar, MapPin, DollarSign, Clock, Star, BarChart3, PieChart, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface EmployerDashboardProps {
  onNavigate: (view: 'dashboard' | 'post-job' | 'jobs' | 'profile') => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      change: '+3 this month',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    {
      title: 'Total Applications',
      value: '247',
      change: '+18 this week',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      title: 'Profile Views',
      value: '1,834',
      change: '+12% vs last month',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trend: 'up'
    },
    {
      title: 'Hired This Month',
      value: '8',
      change: '2 pending offers',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      trend: 'up'
    }
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹80,000 - ₹1,20,000',
      applications: 23,
      postedAt: '2 days ago',
      status: 'active'
    },
    {
      id: '2',
      title: 'Product Manager',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹1,50,000 - ₹2,00,000',
      applications: 15,
      postedAt: '5 days ago',
      status: 'active'
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Remote',
      type: 'Contract',
      salary: '₹60,000 - ₹90,000',
      applications: 31,
      postedAt: '1 week ago',
      status: 'paused'
    }
  ];

  const recentApplications = [
    {
      id: '1',
      candidateName: 'Priya Sharma',
      jobTitle: 'Senior Frontend Developer',
      appliedAt: '2 hours ago',
      experience: '4 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      status: 'new',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '2',
      candidateName: 'Rahul Patel',
      jobTitle: 'Product Manager',
      appliedAt: '4 hours ago',
      experience: '6 years',
      skills: ['Product Strategy', 'Analytics', 'Agile'],
      status: 'reviewed',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: '3',
      candidateName: 'Anita Singh',
      jobTitle: 'UX Designer',
      appliedAt: '6 hours ago',
      experience: '3 years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      status: 'shortlisted',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'new': return 'primary';
      case 'reviewed': return 'secondary';
      case 'shortlisted': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Welcome back, {user?.name}! 👋
            </h1>
            <p className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Here's what's happening with your hiring at {(user as any)?.company || 'your company'}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('post-job')}
            icon={<Plus className="w-5 h-5" />}
            className="shadow-lg hover-lift"
          >
            Post New Job
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} hover className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-10 -mt-10`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <Badge variant={stat.trend === 'up' ? 'success' : 'warning'} size="sm">
                  {stat.trend === 'up' ? '↗' : '↘'}
                </Badge>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm font-medium ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {stat.title}
              </p>
              <p className={`text-xs mt-1 ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
              }`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Your Job Postings
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                  theme === 'light' 
                    ? 'border-gray-200 hover:border-gray-300 bg-gray-50' 
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-1 ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {job.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(job.status)} size="sm" gradient>
                      {job.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`flex items-center ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        <Users className="w-4 h-4 mr-1" />
                        {job.applications} applications
                      </span>
                      <span className={`${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Posted {job.postedAt}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Applications
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Applications */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Recent Applications
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                  theme === 'light' 
                    ? 'border-gray-200 hover:border-gray-300 bg-gray-50' 
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                }`}>
                  <div className="flex items-start space-x-3">
                    <img
                      src={application.avatar}
                      alt={application.candidateName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-sm ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {application.candidateName}
                        </h3>
                        <Badge variant={getStatusColor(application.status)} size="sm">
                          {application.status}
                        </Badge>
                      </div>
                      <p className={`text-xs mb-2 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Applied for {application.jobTitle}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {application.experience} exp
                        </span>
                        <span className={`${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {application.appliedAt}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {application.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="outline" size="sm" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {application.skills.length > 2 && (
                          <Badge variant="outline" size="sm" className="text-xs">
                            +{application.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => onNavigate('post-job')}
                icon={<Plus className="w-4 h-4" />}
                className="justify-start"
              >
                Post New Job
              </Button>
              <Button
                variant="outline"
                fullWidth
                icon={<Users className="w-4 h-4" />}
                className="justify-start"
              >
                Browse Candidates
              </Button>
              <Button
                variant="outline"
                fullWidth
                icon={<BarChart3 className="w-4 h-4" />}
                className="justify-start"
              >
                View Analytics
              </Button>
              <Button
                variant="outline"
                fullWidth
                icon={<Star className="w-4 h-4" />}
                className="justify-start"
              >
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Hiring Analytics
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Last 7 days
              </Button>
              <Button variant="outline" size="sm">
                Last 30 days
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 ${
                theme === 'dark-neon' ? 'shadow-lg shadow-blue-500/25' : 'shadow-lg'
              }`}>
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                85%
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Application Response Rate
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 ${
                theme === 'dark-neon' ? 'shadow-lg shadow-green-500/25' : 'shadow-lg'
              }`}>
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                12 days
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Average Time to Hire
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 ${
                theme === 'dark-neon' ? 'shadow-lg shadow-purple-500/25' : 'shadow-lg'
              }`}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                92%
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Candidate Satisfaction
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};