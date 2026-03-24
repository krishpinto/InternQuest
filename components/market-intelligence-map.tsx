'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { Send, MapPin, AlertCircle, Loader2 } from 'lucide-react';

// Dynamic import for Leaflet (client-side only)
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map-viewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-muted flex items-center justify-center rounded-lg">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  ),
});

const CATEGORIES = [
  { id: 'retail', label: 'Retail', icon: '🛍️' },
  { id: 'food', label: 'Food & Beverage', icon: '🍽️' },
  { id: 'services', label: 'Services', icon: '🔧' },
  { id: 'wellness', label: 'Wellness', icon: '💆' },
  { id: 'tech', label: 'Tech', icon: '💻' },
];

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

const STATE_COORDS: Record<string, [number, number]> = {
  'California': [36.1162, -119.6816],
  'Texas': [31.9686, -99.9018],
  'Florida': [27.9947, -81.7603],
  'New York': [42.1657, -74.9481],
  'Pennsylvania': [40.5908, -77.2098],
  'Illinois': [40.3495, -88.9861],
  'Ohio': [40.3888, -82.7649],
  'Georgia': [33.0406, -83.6431],
  'North Carolina': [35.6301, -79.8064],
  'Michigan': [43.3266, -84.5361],
  'Alabama': [32.8067, -86.7113],
  'Alaska': [64.0685, -152.2782],
  'Arizona': [33.7298, -111.4312],
  'Arkansas': [34.9697, -92.3731],
  'Colorado': [39.0598, -105.3111],
  'Connecticut': [41.5978, -72.7554],
  'Delaware': [39.3185, -75.4730],
  'Hawaii': [21.0943, -157.4983],
  'Idaho': [44.2405, -114.4787],
  'Indiana': [39.8494, -86.2604],
  'Iowa': [42.0115, -93.2105],
  'Kansas': [38.5266, -96.7265],
  'Kentucky': [37.6681, -84.6701],
  'Louisiana': [31.1695, -91.8749],
  'Maine': [44.6939, -69.3819],
  'Maryland': [39.0639, -76.8021],
  'Massachusetts': [42.2352, -71.0275],
  'Minnesota': [45.6945, -93.9196],
  'Mississippi': [32.7416, -89.6787],
  'Missouri': [38.4561, -92.2884],
  'Montana': [46.9219, -103.6006],
  'Nebraska': [41.4925, -99.9018],
  'Nevada': [38.8026, -116.4194],
  'New Hampshire': [43.4525, -71.3129],
  'New Jersey': [40.0583, -74.4057],
  'New Mexico': [34.5199, -105.8701],
  'North Dakota': [47.5289, -99.7840],
  'Oklahoma': [35.5653, -96.9289],
  'Oregon': [43.8041, -120.5542],
  'Rhode Island': [41.6809, -71.5118],
  'South Carolina': [33.8361, -80.9066],
  'South Dakota': [44.0682, -99.7837],
  'Tennessee': [35.7478, -86.6923],
  'Utah': [39.3210, -111.0937],
  'Vermont': [44.0459, -72.7107],
  'Virginia': [37.7693, -78.1694],
  'Washington': [47.7511, -120.7401],
  'West Virginia': [38.4912, -82.9006],
  'Wisconsin': [44.2685, -89.6165],
  'Wyoming': [42.7559, -107.3025],
};

interface MapLocation {
  state: string;
  lat: number;
  lng: number;
}

export function MarketIntelligenceMap() {
  const { businessData } = useAppStore();
  const [selectedState, setSelectedState] = useState<string>('California');
  const [selectedCategory, setSelectedCategory] = useState<string>('retail');
  const [mapLocation, setMapLocation] = useState<MapLocation>({
    state: 'California',
    lat: STATE_COORDS['California'][0],
    lng: STATE_COORDS['California'][1],
  });
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const coords = STATE_COORDS[selectedState];
    if (coords) {
      setMapLocation({
        state: selectedState,
        lat: coords[0],
        lng: coords[1],
      });
    }
  }, [selectedState]);

  const handleDispatchLead = async () => {
    if (!dispatchMessage.trim()) {
      setFeedbackMessage('Please enter a message to dispatch');
      return;
    }

    setIsSending(true);
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/dispatch-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: mapLocation.state,
          category: selectedCategory,
          location: `${mapLocation.lat.toFixed(4)}, ${mapLocation.lng.toFixed(4)}`,
          businessName: businessData?.businessName || 'Misrut User',
          message: dispatchMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedbackMessage('Lead dispatched to Telegram successfully!');
        setDispatchMessage('');
        setTimeout(() => setFeedbackMessage(''), 3000);
      } else {
        setFeedbackMessage(data.error || 'Failed to dispatch lead');
      }
    } catch (error) {
      setFeedbackMessage('Error dispatching lead. Please try again.');
      console.error('Dispatch error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Intelligence Map</h1>
          <p className="text-muted-foreground">Find high-opportunity locations and dispatch leads via Telegram</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Location Map</CardTitle>
                <CardDescription>Select a state to view market opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* State Selector */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Select State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Map Display */}
                  <div className="rounded-lg overflow-hidden border border-border">
                    <MapComponent location={mapLocation} category={selectedCategory} />
                  </div>

                  {/* Location Info */}
                  <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{mapLocation.state}</p>
                      <p className="text-sm text-muted-foreground">
                        Coordinates: {mapLocation.lat.toFixed(4)}, {mapLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Dispatch Section */}
          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-4 py-2 rounded-lg text-left font-medium transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Dispatch Card */}
            <Card className="border-accent bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Dispatch Lead</CardTitle>
                <CardDescription>Send opportunity to Telegram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Lead Message
                    </label>
                    <textarea
                      value={dispatchMessage}
                      onChange={(e) => setDispatchMessage(e.target.value)}
                      placeholder="e.g., Found 5 promising retail locations in downtown area with high foot traffic..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={4}
                    />
                  </div>

                  {feedbackMessage && (
                    <div
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        feedbackMessage.includes('successfully')
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{feedbackMessage}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleDispatchLead}
                    disabled={isSending || !dispatchMessage.trim()}
                    className="w-full"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send to Telegram
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <span>Select your target state</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <span>Choose market category</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <span>Write lead opportunity details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <span>Send directly to your Telegram</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
