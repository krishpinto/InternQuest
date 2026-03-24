'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target, Zap } from 'lucide-react';

export function LandingPage() {
  const { setCurrentView } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance leading-tight">
            Turn Your Local Business into a Market Leader.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Misrut analyzes local market data, competitor movements, and consumer demand to give you exact steps on how to grow.
          </p>
          
          <Button
            size="lg"
            onClick={() => setCurrentView('onboarding')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Your Growth Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Beat Competitors</h3>
            <p className="text-muted-foreground">
              Get real-time competitive intelligence and identify gaps your competitors have missed.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Find Hidden Markets</h3>
            <p className="text-muted-foreground">
              Discover untapped opportunities in your locality with our whitespace mapping technology.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Partner with Locals</h3>
            <p className="text-muted-foreground">
              Find strategic partnership opportunities with complementary businesses in your area.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to unlock your growth potential?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of merchants who are already using Misrut to grow their businesses.
          </p>
          <Button
            size="lg"
            onClick={() => setCurrentView('onboarding')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
