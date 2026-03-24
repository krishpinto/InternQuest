import { create } from 'zustand';

export type CurrentView = 'landing' | 'onboarding' | 'dashboard' | 'analytics' | 'market-map';

export interface BusinessData {
  businessName: string;
  industry: string;
  locality: string;
  teamSize: string;
  description: string;
}

interface AppStore {
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  businessData: BusinessData | null;
  setBusinessData: (data: BusinessData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentView: 'landing',
  setCurrentView: (view) => set({ currentView: view }),
  businessData: null,
  setBusinessData: (data) => set({ businessData: data }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
