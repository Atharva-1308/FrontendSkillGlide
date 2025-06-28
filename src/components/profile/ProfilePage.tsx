import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Globe, Camera, Save, Edit3, Plus, Trash2, Award, Briefcase, GraduationCap, Star, Settings, Shield, Bell, Eye, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface ProfilePageProps {
  onNavigate?: (view: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, isEmployer, isJobSeeker } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [profileData, setProfileData] = useState({
    // Personal Info
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    bio: 'Passionate software developer with 5+ years of experience in building scalable web applications.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    
    // Professional Info (Job Seeker)
    currentRole: 'Senior Frontend Developer',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'],
    expectedSalary: '₹80,000 - ₹1,20,000',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    linkedIn: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev',
    
    // Company Info (Employer)
    companyName: (user as any)?.company || 'TechCorp Solutions',
    companyWebsite: 'https://techcorp.com',
    companySize: '201-500 employees',
    industry: 'Technology',
    companyDescription: 'Leading technology company focused on innovative solutions.',
    
    // Settings
    emailNotifications: true,
    jobAlerts: true,
    profileVisibility: 'public',
    twoFactorAuth: false,
  });

  const tabs = isJobSeeker ? [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'professional', name: 'Professional', icon: Briefcase },
    { id: 'skills', name: 'Skills & Portfolio', icon: Award },
    { id: 'preferences', name: 'Job Preferences', icon: Star },
    { id: 'privacy', name: 'Privacy & Settings', icon: Settings },
  ] : [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'company', name: 'Company Info', icon: Building },
    { id: 'hiring', name: 'Hiring Preferences', icon: Star },
    { id: 'privacy', name: 'Privacy & Settings', icon: Settings },
  ];

  const updateProfileData = (field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill.trim())) {
      updateProfileData('skills', [...profileData.skills, skill.trim()]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateProfileData('skills', profileData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      
      console.log('Profile saved:', profileData);
    } catch (error) {
      setSaveMessage('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveMessage('');
    // Reset form data if needed
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profileData.avatar}
            alt="Profile"
            className={`w-24 h-24 rounded-full object-cover ${
              theme === 'dark-neon' ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/25' : 'ring-2 ring-gray-200 shadow-lg'
            }`}
          />
          {isEditing && (
            <button className={`absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors ${
              theme === 'dark-neon' ? 'shadow-lg shadow-blue-500/25' : 'shadow-md'
            }`}>
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Profile Picture
          </h3>
          <p className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Upload a professional photo to make a great first impression
          </p>
          {isEditing && (
            <div className="flex space-x-2 mt-2">
              <Button variant="outline" size="sm" icon={<Upload className="w-4 h-4" />}>
                Upload New
              </Button>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={profileData.name}
          onChange={(e) => updateProfileData('name', e.target.value)}
          disabled={!isEditing}
          icon={<User className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="Email Address"
          type="email"
          value={profileData.email}
          onChange={(e) => updateProfileData('email', e.target.value)}
          disabled={!isEditing}
          icon={<Mail className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="Phone Number"
          value={profileData.phone}
          onChange={(e) => updateProfileData('phone', e.target.value)}
          disabled={!isEditing}
          icon={<Phone className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="Location"
          value={profileData.location}
          onChange={(e) => updateProfileData('location', e.target.value)}
          disabled={!isEditing}
          icon={<MapPin className="w-4 h-4" />}
          fullWidth
        />
      </div>

      {/* Bio */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          Bio / About Me
        </label>
        <textarea
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
            theme === 'light'
              ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
              : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
          } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
          rows={4}
          value={profileData.bio}
          onChange={(e) => updateProfileData('bio', e.target.value)}
          disabled={!isEditing}
          placeholder="Tell us about yourself, your interests, and what drives you..."
        />
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Current Role"
          value={profileData.currentRole}
          onChange={(e) => updateProfileData('currentRole', e.target.value)}
          disabled={!isEditing}
          icon={<Briefcase className="w-4 h-4" />}
          fullWidth
        />
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Experience Level
          </label>
          <select
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-transparent transition-colors ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
            } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
            value={profileData.experience}
            onChange={(e) => updateProfileData('experience', e.target.value)}
            disabled={!isEditing}
          >
            <option value="Fresher">Fresher (0-1 years)</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </div>
        
        <Input
          label="Expected Salary"
          value={profileData.expectedSalary}
          onChange={(e) => updateProfileData('expectedSalary', e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Preferred Work Mode
          </label>
          <select
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-transparent transition-colors ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
            } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
            value={profileData.workMode}
            onChange={(e) => updateProfileData('workMode', e.target.value)}
            disabled={!isEditing}
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="LinkedIn Profile"
          value={profileData.linkedIn}
          onChange={(e) => updateProfileData('linkedIn', e.target.value)}
          disabled={!isEditing}
          icon={<Globe className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="GitHub Profile"
          value={profileData.github}
          onChange={(e) => updateProfileData('github', e.target.value)}
          disabled={!isEditing}
          icon={<Globe className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="Portfolio Website"
          value={profileData.portfolio}
          onChange={(e) => updateProfileData('portfolio', e.target.value)}
          disabled={!isEditing}
          icon={<Globe className="w-4 h-4" />}
          fullWidth
        />
      </div>
    </div>
  );

  const renderSkillsPortfolio = () => (
    <div className="space-y-6">
      {/* Skills */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          Skills & Technologies
        </label>
        
        {profileData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {profileData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="primary"
                className={`flex items-center space-x-1 ${isEditing ? 'cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20' : ''}`}
                onClick={() => isEditing && removeSkill(skill)}
              >
                <span>{skill}</span>
                {isEditing && <span className="ml-1 hover:bg-white/20 rounded-full">×</span>}
              </Badge>
            ))}
          </div>
        )}
        
        {isEditing && (
          <div className="flex space-x-2">
            <Input
              placeholder="Add a skill (e.g., React, Leadership)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
              fullWidth
            />
            <Button
              variant="outline"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="Add a skill"]') as HTMLInputElement;
                if (input && input.value.trim()) {
                  addSkill(input.value);
                  input.value = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        )}
      </div>

      {/* Resume */}
      <Card className={`${
        theme === 'light' 
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200' 
          : 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'light' ? 'text-blue-900' : 'text-blue-300'
            }`}>
              Resume & Documents
            </h3>
            <p className={`text-sm ${
              theme === 'light' ? 'text-blue-700' : 'text-blue-400'
            }`}>
              Keep your resume updated to attract the best opportunities
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Download
            </Button>
            <Button variant="primary" size="sm" icon={<Upload className="w-4 h-4" />}>
              Update Resume
            </Button>
          </div>
        </div>
      </Card>

      {/* Certifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Certifications
          </h3>
          {isEditing && (
            <Button variant="outline" size="sm" icon={<Plus className="w-4 h-4" />}>
              Add Certification
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
            { name: 'React Developer Certification', issuer: 'Meta', date: '2022' }
          ].map((cert, index) => (
            <Card key={index} className="flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center ${
                  theme === 'dark-neon' ? 'shadow-lg shadow-green-500/25' : 'shadow-md'
                }`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {cert.name}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          value={profileData.companyName}
          onChange={(e) => updateProfileData('companyName', e.target.value)}
          disabled={!isEditing}
          icon={<Building className="w-4 h-4" />}
          fullWidth
        />
        
        <Input
          label="Company Website"
          value={profileData.companyWebsite}
          onChange={(e) => updateProfileData('companyWebsite', e.target.value)}
          disabled={!isEditing}
          icon={<Globe className="w-4 h-4" />}
          fullWidth
        />
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Company Size
          </label>
          <select
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-transparent transition-colors ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
            } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
            value={profileData.companySize}
            onChange={(e) => updateProfileData('companySize', e.target.value)}
            disabled={!isEditing}
          >
            <option value="1-10 employees">1-10 employees</option>
            <option value="11-50 employees">11-50 employees</option>
            <option value="51-200 employees">51-200 employees</option>
            <option value="201-500 employees">201-500 employees</option>
            <option value="501-1000 employees">501-1000 employees</option>
            <option value="1000+ employees">1000+ employees</option>
          </select>
        </div>
        
        <Input
          label="Industry"
          value={profileData.industry}
          onChange={(e) => updateProfileData('industry', e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          Company Description
        </label>
        <textarea
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
            theme === 'light'
              ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
              : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
          } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
          rows={4}
          value={profileData.companyDescription}
          onChange={(e) => updateProfileData('companyDescription', e.target.value)}
          disabled={!isEditing}
          placeholder="Describe your company, its mission, and what makes it special..."
        />
      </div>
    </div>
  );

  const renderJobPreferences = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Preferred Job Type
          </label>
          <select
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-transparent transition-colors ${
              theme === 'light'
                ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
            } ${!isEditing ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
            value={profileData.jobType}
            onChange={(e) => updateProfileData('jobType', e.target.value)}
            disabled={!isEditing}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        
        <Input
          label="Expected Salary Range"
          value={profileData.expectedSalary}
          onChange={(e) => updateProfileData('expectedSalary', e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
      </div>
      
      <Card className={`${
        theme === 'light' 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'light' ? 'text-green-900' : 'text-green-300'
        }`}>
          Job Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-medium mb-2 ${
              theme === 'light' ? 'text-green-800' : 'text-green-400'
            }`}>
              Preferred Locations
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Bangalore', 'Mumbai', 'Delhi', 'Remote'].map((location) => (
                <Badge key={location} variant="success" size="sm">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${
              theme === 'light' ? 'text-green-800' : 'text-green-400'
            }`}>
              Preferred Industries
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Fintech', 'Healthcare', 'E-commerce'].map((industry) => (
                <Badge key={industry} variant="success" size="sm">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderHiringPreferences = () => (
    <div className="space-y-6">
      <Card className={`${
        theme === 'light' 
          ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' 
          : 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'light' ? 'text-purple-900' : 'text-purple-300'
        }`}>
          Hiring Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-medium mb-2 ${
              theme === 'light' ? 'text-purple-800' : 'text-purple-400'
            }`}>
              Preferred Candidate Locations
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Bangalore', 'Mumbai', 'Delhi', 'Remote', 'Hybrid'].map((location) => (
                <Badge key={location} variant="secondary" size="sm">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${
              theme === 'light' ? 'text-purple-800' : 'text-purple-400'
            }`}>
              Hiring Budget Range
            </h4>
            <p className={`text-sm ${
              theme === 'light' ? 'text-purple-700' : 'text-purple-400'
            }`}>
              ₹50,000 - ₹2,00,000 per month
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <h3 className={`text-lg font-semibold mb-4 flex items-center ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive important updates via email' },
            { key: 'jobAlerts', label: 'Job Alerts', description: 'Get notified about new job opportunities' },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <h4 className={`font-medium ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {setting.label}
                </h4>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {setting.description}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profileData[setting.key as keyof typeof profileData] as boolean}
                  onChange={(e) => updateProfileData(setting.key, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <h3 className={`text-lg font-semibold mb-4 flex items-center ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          <Eye className="w-5 h-5 mr-2" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Profile Visibility
            </label>
            <select
              className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:border-transparent transition-colors ${
                theme === 'light'
                  ? 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  : 'border-gray-600 bg-gray-800 text-white focus:ring-cyan-500'
              }`}
              value={profileData.profileVisibility}
              onChange={(e) => updateProfileData('profileVisibility', e.target.value)}
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="recruiters">Recruiters Only - Visible to verified recruiters</option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card>
        <h3 className={`text-lg font-semibold mb-4 flex items-center ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className={`font-medium ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Two-Factor Authentication
              </h4>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Add an extra layer of security to your account
              </p>
            </div>
            <Button
              variant={profileData.twoFactorAuth ? 'success' : 'outline'}
              size="sm"
              onClick={() => updateProfileData('twoFactorAuth', !profileData.twoFactorAuth)}
            >
              {profileData.twoFactorAuth ? 'Enabled' : 'Enable'}
            </Button>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Change Password
              </Button>
              <Button variant="outline" size="sm">
                Download My Data
              </Button>
              <Button variant="outline" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalInfo();
      case 'professional': return renderProfessionalInfo();
      case 'skills': return renderSkillsPortfolio();
      case 'company': return renderCompanyInfo();
      case 'preferences': return renderJobPreferences();
      case 'hiring': return renderHiringPreferences();
      case 'privacy': return renderPrivacySettings();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${
      theme === 'light' ? 'min-h-screen' : ''
    }`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Profile Settings
            </h1>
            <p className={`text-xl ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Manage your profile information and account preferences
            </p>
          </div>
          
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isSaving}
                  icon={<Save className="w-4 h-4" />}
                  className="shadow-lg"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                icon={<Edit3 className="w-4 h-4" />}
                className="shadow-lg hover-lift"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
            saveMessage.includes('success') 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {saveMessage.includes('success') ? (
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
            <p className={`text-sm ${
              saveMessage.includes('success') 
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            }`}>
              {saveMessage}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:scale-105 ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="min-h-[600px]">
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
            </div>
            
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};