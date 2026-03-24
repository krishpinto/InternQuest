'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Send, MapPin } from 'lucide-react';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const CATEGORIES = [
  'Cloud Kitchens',
  'Pharmacy',
  'Grocery Store',
  'Restaurant',
  'Salon',
  'Gym',
  'Repair Shop',
  'Clothing Store',
  'Electronics',
  'Other'
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-blue-500' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
];

export function LeadDispatch() {
  const businessData = useAppStore((state) => state.businessData);
  const [selectedState, setSelectedState] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [isLoading, setIsLoading] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDispatch = async () => {
    if (!selectedState || !category) {
      setError('Please select both a state and category');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDispatchSuccess(false);

    try {
      const response = await fetch('/api/dispatch-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stateName: selectedState,
          category,
          priority,
          businessName: businessData?.businessName || 'Misrut Merchant',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to dispatch lead');
      }

      setDispatchSuccess(true);
      setSelectedState('');
      setCategory('');
      setTimeout(() => setDispatchSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Lead Dispatch Center</h1>
          <p className="text-muted-foreground">Identify market opportunities and dispatch teams via Telegram</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6 border border-muted sticky top-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Dispatch Configuration
              </h2>

              <div className="space-y-4">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Target State
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Business Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRIORITY_LEVELS.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setPriority(level.value as 'low' | 'medium' | 'high')}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                          priority === level.value
                            ? `${level.color} text-white`
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Merchant Info Display */}
                {businessData && (
                  <div className="bg-muted/50 p-3 rounded-lg border border-muted text-sm">
                    <p className="text-muted-foreground font-medium mb-1">Your Business</p>
                    <p className="text-foreground font-semibold">{businessData.businessName}</p>
                    <p className="text-muted-foreground text-xs mt-1">{businessData.industry}</p>
                  </div>
                )}

                {/* Messages */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-700 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {dispatchSuccess && (
                  <div className="bg-primary/10 border border-primary text-primary px-3 py-2 rounded-lg text-sm font-medium">
                    ✓ Lead dispatched to Telegram!
                  </div>
                )}

                {/* Dispatch Button */}
                <Button
                  onClick={handleDispatch}
                  disabled={isLoading || !selectedState || !category}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Dispatching...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Deploy to Telegram
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Map & Info */}
          <div className="lg:col-span-2">
            <Card className="p-6 border border-muted">
              <h2 className="text-xl font-semibold mb-4">US Market Opportunity Map</h2>
              
              {/* Simple Text-based State Display */}
              <div className="bg-muted/50 rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center">
                {selectedState ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-4">{selectedState}</div>
                    <div className="text-lg text-foreground mb-2">
                      {category ? `Opportunity: ${category}` : 'Select a category'}
                    </div>
                    {category && (
                      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                        <p>📍 Market analysis in progress</p>
                        <p>👥 Analyzing local foot traffic patterns</p>
                        <p>🎯 Identifying whitespace opportunities</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a state to view market opportunities</p>
                  </div>
                )}
              </div>

              {/* Market Intelligence Cards */}
              {selectedState && category && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="text-sm text-muted-foreground">Market Confidence</div>
                    <div className="text-2xl font-bold text-primary">92%</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-lg border border-amber-500/20">
                    <div className="text-sm text-muted-foreground">Opportunity Score</div>
                    <div className="text-2xl font-bold text-amber-600">8.7/10</div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
