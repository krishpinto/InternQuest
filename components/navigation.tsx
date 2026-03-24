'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const { currentView, setCurrentView } = useAppStore();

  return (
    <nav className="border-b border-border bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">Misrut</span>
          </div>
          
          <div className="flex items-center gap-1">
            {['landing', 'onboarding', 'dashboard', 'analytics', 'market-map'].map((view) => (
              <Button
                key={view}
                variant={currentView === view ? 'default' : 'ghost'}
                onClick={() => setCurrentView(view as any)}
                className="capitalize"
              >
                {view === 'landing' && 'Home'}
                {view === 'onboarding' && 'Onboard'}
                {view === 'dashboard' && 'Dashboard'}
                {view === 'analytics' && 'Analytics'}
                {view === 'market-map' && 'Market Map'}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
