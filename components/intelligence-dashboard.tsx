'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, Map, Calculator, Users } from 'lucide-react';

export function IntelligenceDashboard() {
  const { businessData, setCurrentView } = useAppStore();

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Custom Growth Engine</h1>
          <p className="text-muted-foreground">
            AI-powered insights for <span className="font-semibold text-foreground">{businessData.businessName}</span> in <span className="font-semibold text-foreground">{businessData.locality}</span>
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Growth Playbook Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Growth Playbook Available</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    3 similar {businessData.industry.toLowerCase()} shops in your area grew by 40% using this 3-step strategy.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/5">
              View Steps
            </Button>
          </div>

          {/* Competitive Alert Card */}
          <div className="bg-card border-2 border-accent/50 rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Competitive Threat Alert</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium">Warning:</span> A new competitor 1km away has higher ratings for packaging. <span className="font-medium text-foreground">Action:</span> Upgrade packaging to retain tier-1 clients.
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              High Priority
            </div>
          </div>

          {/* Whitespace Mapping Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Map className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Whitespace Mapping</h3>
                <div className="mt-3 bg-muted/50 rounded-lg p-4 text-center py-8">
                  <p className="text-sm text-muted-foreground font-medium">Uncharted Territory</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Urban Company has low reach in {businessData.locality} East. High potential for {businessData.industry.toLowerCase()} dominance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lost Opportunity Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Lost Opportunity Calculator</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Add specialized sub-services to your catalog. Competitors are monetizing these effectively, capturing an estimated <span className="font-semibold text-foreground">15-20% additional revenue</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Partnership Opportunity Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow md:col-span-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Partnership Match</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Local businesses actively seeking partnerships in your niche. Cross-sell opportunities available to scale your reach.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary/5">
              View Partnership Opportunities
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to execute?</h3>
            <p className="text-muted-foreground">
              View your projected revenue impact with our predictive analytics.
            </p>
          </div>
          <Button
            onClick={() => setCurrentView('analytics')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
          >
            View Growth Forecast
          </Button>
        </div>
      </div>
    </div>
  );
}
