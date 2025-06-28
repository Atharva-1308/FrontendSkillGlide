import React from 'react';
import { ArrowRight, Play, Star, Users, Briefcase, Award, Zap, CheckCircle, TrendingUp, Globe, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useTheme } from '../../contexts/ThemeContext';

interface HomePageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onSignIn }) => {
  const { theme } = useTheme();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI matches you with the perfect job opportunities based on your skills and preferences.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Smart Resume Builder',
      description: 'Create stunning resumes with AI assistance, video introductions, and professional templates.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Opportunities',
      description: 'Access thousands of job opportunities from top companies worldwide, all in one place.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security. Apply with confidence.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Jobs', icon: <Briefcase className="w-5 h-5" /> },
    { number: '25K+', label: 'Happy Users', icon: <Users className="w-5 h-5" /> },
    { number: '500+', label: 'Top Companies', icon: <Star className="w-5 h-5" /> },
    { number: '95%', label: 'Success Rate', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      content: 'SkillGlide helped me land my dream job at Google. The AI matching was incredibly accurate!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Rahul Patel',
      role: 'Product Manager at Microsoft',
      content: 'The resume builder with video feature made me stand out. Got 3 interview calls in a week!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Anita Singh',
      role: 'UX Designer at Adobe',
      content: 'Best job portal I have used. The interface is beautiful and the job recommendations are spot-on.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className={`relative overflow-hidden py-20 lg:py-32 ${
        theme === 'light' 
          ? 'hero-gradient bg-light-pattern' 
          : 'hero-gradient bg-dark-pattern'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="primary" size="lg" gradient className="mb-6 animate-bounce-gentle">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Job Portal
              </Badge>
              
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 leading-tight ${
                theme === 'light' 
                  ? 'text-gray-900' 
                  : 'text-white'
              }`}>
                Find Your
                <span className={`block font-black animate-pulse-slow ${
                  theme === 'light'
                    ? 'text-blue-800'
                    : 'bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent'
                }`}>
                  Dream Job
                </span>
                <span className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
                  with AI
                </span>
              </h1>
              
              <p className={`text-xl mb-8 leading-relaxed max-w-2xl ${
                theme === 'light' 
                  ? 'text-gray-700' 
                  : 'text-gray-300'
              }`}>
                SkillGlide revolutionizes job hunting with AI-powered matching, smart resume building, 
                and personalized career guidance. Join thousands who found their perfect career match.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  size="xl" 
                  onClick={onGetStarted}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className={`shadow-2xl hover-lift ${
                    theme === 'dark-neon' ? 'neon-glow' : 'soft-shadow'
                  }`}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  icon={<Play className="w-5 h-5" />}
                  className="group hover-lift"
                >
                  <span className="group-hover:mr-1 transition-all">Watch Demo</span>
                </Button>
              </div>
              
              <div className={`flex items-center justify-center lg:justify-start space-x-6 text-sm ${
                theme === 'light' 
                  ? 'text-gray-600' 
                  : 'text-gray-400'
              }`}>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No spam
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Instant matching
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <Card className={`p-8 glass shadow-2xl animate-float ${
                  theme === 'dark-neon' ? 'neon-glow' : 'soft-shadow'
                }`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${
                      theme === 'dark-neon' ? 'glow' : 'soft-shadow'
                    }`}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>AI Job Match</h3>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>95% accuracy</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                      }`}>Senior Developer</span>
                      <Badge variant="success" size="sm" gradient>98% Match</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                      }`}>Product Manager</span>
                      <Badge variant="primary" size="sm" gradient>92% Match</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                      }`}>UX Designer</span>
                      <Badge variant="secondary" size="sm" gradient>89% Match</Badge>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce-gentle ${
                theme === 'dark-neon' ? 'glow' : ''
              }`}></div>
              <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 animate-float ${
                theme === 'dark-neon' ? 'glow' : ''
              }`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className={`py-16 border-y transition-all duration-300 ${
        theme === 'light'
          ? 'bg-white border-gray-200 soft-shadow'
          : 'bg-gray-900 border-gray-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform ${
                  theme === 'dark-neon' ? 'glow hover:neon-glow' : 'soft-shadow hover:shadow-lg'
                }`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {stat.number}
                </div>
                <div className={`font-medium ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className={`py-20 ${
        theme === 'light' 
          ? 'section-gradient bg-light-pattern' 
          : 'bg-gradient-to-br from-gray-800 to-gray-900 bg-dark-pattern'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" size="lg" gradient className="mb-4">
              Why Choose SkillGlide
            </Badge>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Powerful Features for
              <span className={`block font-black ${
                theme === 'light'
                  ? 'text-purple-800'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
              }`}>
                Modern Job Seekers
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Experience the future of job hunting with our cutting-edge AI technology and intuitive design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                hover 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover-lift"
                gradient
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg ${
                  theme === 'dark-neon' ? 'glow group-hover:neon-glow' : 'soft-shadow'
                }`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className={`py-20 ${
        theme === 'light' 
          ? 'light-gradient-1 bg-light-pattern' 
          : 'bg-gradient-to-br from-gray-800 to-blue-900 bg-dark-pattern'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="success" size="lg" gradient className="mb-4">
              Success Stories
            </Badge>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              What Our Users Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Real stories from real people who transformed their careers with SkillGlide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover className="text-center group hover-lift">
                <div className="relative mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className={`w-20 h-20 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform ${
                      theme === 'dark-neon' ? 'glow' : 'soft-shadow'
                    }`}
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className={`mb-6 italic leading-relaxed ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  "{testimonial.content}"
                </p>
                
                <div>
                  <h4 className={`font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Find Your
            <span className="block">Dream Job?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join SkillGlide today and let our AI-powered platform connect you with opportunities 
            that match your skills and aspirations perfectly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover-lift"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600 hover-lift"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free forever
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Setup in 2 minutes
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};