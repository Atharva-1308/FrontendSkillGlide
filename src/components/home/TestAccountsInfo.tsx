import React from 'react';
import { User, Building, Copy, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';

export const TestAccountsInfo: React.FC = () => {
  const { theme } = useTheme();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accounts = [
    {
      type: 'Job Seeker',
      icon: <User className="w-5 h-5" />,
      email: 'john.doe@skillglide.com',
      password: 'password123',
      name: 'John Doe',
      details: [
        'Location: Bangalore, India',
        'Experience: 3 years',
        'Skills: React, TypeScript, Node.js, Python, AWS',
        'Phone: +91 98765 43210'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'Employer',
      icon: <Building className="w-5 h-5" />,
      email: 'hr@techcorp.com',
      password: 'employer123',
      name: 'Sarah Wilson (HR Manager)',
      details: [
        'Company: TechCorp Solutions',
        'Industry: Technology',
        'Company Size: 201-500 employees',
        'Website: techcorp.com'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className={`py-16 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
        : 'bg-gradient-to-br from-gray-800 to-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" size="lg" gradient className="mb-4">
            Demo Accounts
          </Badge>
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Test the Platform
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Use these demo accounts to explore all features of SkillGlide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accounts.map((account, index) => (
            <Card key={index} className="relative overflow-hidden" hover>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${account.color}`} />
              
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-xl flex items-center justify-center text-white`}>
                  {account.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {account.type} Account
                  </h3>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {account.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className={`flex-1 px-3 py-2 rounded-lg text-sm font-mono ${
                      theme === 'light' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-gray-800 text-gray-200'
                    }`}>
                      {account.email}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(account.email, `email-${index}`)}
                      icon={copiedField === `email-${index}` ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> : 
                        <Copy className="w-4 h-4" />
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Password
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className={`flex-1 px-3 py-2 rounded-lg text-sm font-mono ${
                      theme === 'light' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-gray-800 text-gray-200'
                    }`}>
                      {account.password}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(account.password, `password-${index}`)}
                      icon={copiedField === `password-${index}` ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> : 
                        <Copy className="w-4 h-4" />
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Account Details
                </h4>
                <ul className="space-y-2">
                  {account.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className={`text-sm flex items-center ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${account.color} rounded-full mr-3`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === 'light' 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-blue-900/20 border border-blue-800'
              }`}>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-blue-800' : 'text-blue-300'
                }`}>
                  <strong>How to test:</strong> Click "Log In" → Select "{account.type}" → 
                  Use the credentials above → Explore all features!
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className={`max-w-4xl mx-auto ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'light' ? 'text-green-900' : 'text-green-300'
            }`}>
              🧪 Testing Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'light' ? 'text-green-800' : 'text-green-400'
                }`}>
                  Job Seeker Features:
                </h4>
                <ul className={`text-sm space-y-1 ${
                  theme === 'light' ? 'text-green-700' : 'text-green-300'
                }`}>
                  <li>✓ Browse and filter jobs</li>
                  <li>✓ Create and edit resume</li>
                  <li>✓ Record video/voice resume</li>
                  <li>✓ Apply to jobs</li>
                  <li>✓ Save favorite jobs</li>
                  <li>✓ Profile management</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'light' ? 'text-green-800' : 'text-green-400'
                }`}>
                  Employer Features:
                </h4>
                <ul className={`text-sm space-y-1 ${
                  theme === 'light' ? 'text-green-700' : 'text-green-300'
                }`}>
                  <li>✓ Post new jobs</li>
                  <li>✓ Manage job listings</li>
                  <li>✓ Review applications</li>
                  <li>✓ Company profile setup</li>
                  <li>✓ Candidate search</li>
                  <li>✓ Analytics dashboard</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};