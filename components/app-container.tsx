'use client';

import { useAppStore } from '@/lib/store';
import { Navigation } from '@/components/navigation';
import { LandingPage } from '@/components/landing-page';
import { OnboardingForm } from '@/components/onboarding-form';
import { IntelligenceDashboard } from '@/components/intelligence-dashboard';
import { PredictiveAnalytics } from '@/components/predictive-analytics';
import { MarketIntelligenceMap } from '@/components/market-intelligence-map';

export function AppContainer() {
  const { currentView } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'onboarding' && <OnboardingForm />}
        {currentView === 'dashboard' && <IntelligenceDashboard />}
        {currentView === 'analytics' && <PredictiveAnalytics />}
        {currentView === 'market-map' && <MarketIntelligenceMap />}
      </main>
    </div>
  );
}
