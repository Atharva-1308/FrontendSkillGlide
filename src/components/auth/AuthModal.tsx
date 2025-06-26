import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Building } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onGetStarted?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onGetStarted,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, register, loading } = useAuth();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setFormData({ name: '', email: '', password: '', company: '' });
      setErrors({});
    }
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (userType === 'employer' && !formData.company.trim()) {
        newErrors.company = 'Company name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password, userType);
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          role: userType,
          ...(userType === 'employer' && { company: formData.company }),
        });
      }
      onClose();
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignUpClick = () => {
    onClose();
    onGetStarted?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {mode === 'login' ? 'Welcome Back to SkillGlide' : 'Join SkillGlide'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'login' 
              ? 'Sign in to your account to continue your career journey' 
              : 'Create your account and discover amazing opportunities'
            }
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            I am a:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUserType('jobseeker')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                userType === 'jobseeker'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <User className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('employer')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                userType === 'employer'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Building className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Employer</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              icon={<User className="w-4 h-4" />}
              error={errors.name}
              required
              fullWidth
            />
          )}

          {mode === 'register' && userType === 'employer' && (
            <Input
              label="Company Name"
              placeholder="Tech Corp"
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
              icon={<Building className="w-4 h-4" />}
              error={errors.company}
              required
              fullWidth
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            error={errors.email}
            required
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            error={errors.password}
            required
            fullWidth
          />

          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            fullWidth
          >
            {mode === 'login' ? 'Sign In to SkillGlide' : 'Create SkillGlide Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? "Don't have a SkillGlide account?" : 'Already have a SkillGlide account?'}
            <button
              onClick={() => {
                if (mode === 'login') {
                  handleSignUpClick();
                } else {
                  setMode('login');
                  setErrors({});
                }
              }}
              className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};