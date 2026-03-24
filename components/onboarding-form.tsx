'use client';

import { useState } from 'react';
import { useAppStore, BusinessData } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Loader2 } from 'lucide-react';

export function OnboardingForm() {
  const { setCurrentView, setBusinessData, setIsLoading, isLoading } = useAppStore();
  
  const [formData, setFormData] = useState<BusinessData>({
    businessName: '',
    industry: 'Electronics',
    locality: '',
    teamSize: '',
    description: '',
  });

  const industries = [
    'Electronics',
    'Cleaning',
    'Catering',
    'Retail',
    'Services',
    'Food & Beverage',
    'Transportation',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.businessName || !formData.locality) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analysis with timeout
    setTimeout(() => {
      setBusinessData(formData);
      setIsLoading(false);
      setCurrentView('dashboard');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">
            Analyzing Your Market
          </h2>
          <p className="text-muted-foreground">
            Gemini is analyzing local data, competitor movements, and market opportunities for your business...
          </p>
          <div className="pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Scanning competitor landscape
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                Identifying market opportunities
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                Generating personalized growth strategy
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Tell Us About Your Business</h1>
          <p className="text-muted-foreground">
            Help us understand your business so we can generate a personalized growth plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div className="space-y-2">
            <label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Business Name *
            </label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="e.g., Sharma Electronics"
              value={formData.businessName}
              onChange={handleChange}
              className="bg-background border-border"
              required
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium text-foreground">
              Industry/Specialization
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Locality */}
          <div className="space-y-2">
            <label htmlFor="locality" className="text-sm font-medium text-foreground">
              Locality/Operating Area *
            </label>
            <Input
              id="locality"
              name="locality"
              placeholder="e.g., Borivali, Mumbai"
              value={formData.locality}
              onChange={handleChange}
              className="bg-background border-border"
              required
            />
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <label htmlFor="teamSize" className="text-sm font-medium text-foreground">
              Estimated Team Size & Margins
            </label>
            <Input
              id="teamSize"
              name="teamSize"
              placeholder="e.g., 5 people, 30% margin"
              value={formData.teamSize}
              onChange={handleChange}
              className="bg-background border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Tell us about your business (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Products, challenges, goals... Anything helps!"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
          >
            Analyze Market & Generate Leads
          </Button>
        </form>

        <button
          onClick={() => setCurrentView('landing')}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
