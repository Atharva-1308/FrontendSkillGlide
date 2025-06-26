import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, JobSeeker, Employer } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, role: 'jobseeker' | 'employer') => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isJobSeeker: boolean;
  isEmployer: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Dummy accounts for testing
const dummyAccounts = {
  // Job Seeker Account
  'john.doe@skillglide.com': {
    id: 'js_001',
    email: 'john.doe@skillglide.com',
    name: 'John Doe',
    role: 'jobseeker' as const,
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    experience: 3,
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    createdAt: new Date('2024-01-15'),
    password: 'password123'
  },
  // Employer Account
  'hr@techcorp.com': {
    id: 'emp_001',
    email: 'hr@techcorp.com',
    name: 'Sarah Wilson',
    role: 'employer' as const,
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'Technology',
    companySize: '201-500',
    website: 'https://techcorp.com',
    createdAt: new Date('2024-01-10'),
    password: 'employer123'
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from storage or API
    try {
      const savedUser = localStorage.getItem('job-portal-user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('job-portal-user');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'jobseeker' | 'employer') => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if it's a dummy account
      const dummyAccount = dummyAccounts[email as keyof typeof dummyAccounts];
      
      if (dummyAccount && dummyAccount.password === password && dummyAccount.role === role) {
        // Use dummy account data
        const { password: _, ...userWithoutPassword } = dummyAccount;
        setUser(userWithoutPassword);
        localStorage.setItem('job-portal-user', JSON.stringify(userWithoutPassword));
      } else {
        // Create mock user for other emails
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          role,
          createdAt: new Date(),
        };

        setUser(mockUser);
        localStorage.setItem('job-portal-user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email || '',
        name: userData.name || '',
        role: userData.role || 'jobseeker',
        createdAt: new Date(),
        ...userData,
      };

      setUser(newUser);
      localStorage.setItem('job-portal-user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('job-portal-user');
      
      // Force redirect to home page by reloading the page
      // This ensures the app state is completely reset
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just reload the page
      window.location.reload();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
        isJobSeeker: user?.role === 'jobseeker',
        isEmployer: user?.role === 'employer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};