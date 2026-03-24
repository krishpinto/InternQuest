import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewerProps {
  location: {
    state: string;
    lat: number;
    lng: number;
  };
  category: string;
}

// Fix Leaflet icon issue with webpack
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  shadowAnchor: [13, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.setIcon(DefaultIcon);

// Opportunity zones based on category
const OPPORTUNITY_ZONES: Record<string, { lat: number; lng: number; name: string }[]> = {
  retail: [
    { lat: 0.02, lng: 0.02, name: 'Downtown Retail Hub' },
    { lat: -0.01, lng: 0.03, name: 'Shopping District' },
    { lat: 0.01, lng: -0.02, name: 'Commercial Zone' },
  ],
  food: [
    { lat: 0.015, lng: 0.015, name: 'Food Court Area' },
    { lat: -0.015, lng: 0.01, name: 'Restaurant Row' },
    { lat: 0.005, lng: -0.025, name: 'Market Square' },
  ],
  services: [
    { lat: 0.01, lng: 0.025, name: 'Business District' },
    { lat: -0.02, lng: -0.01, name: 'Service Center' },
    { lat: 0.02, lng: -0.015, name: 'Industrial Area' },
  ],
  wellness: [
    { lat: -0.005, lng: 0.02, name: 'Health & Wellness Hub' },
    { lat: 0.025, lng: 0.005, name: 'Fitness Zone' },
    { lat: 0.01, lng: -0.025, name: 'Community Health' },
  ],
  tech: [
    { lat: 0.02, lng: -0.02, name: 'Tech Hub' },
    { lat: -0.01, lng: 0.025, name: 'Innovation District' },
    { lat: 0.015, lng: -0.005, name: 'Startup Zone' },
  ],
};

const CATEGORY_COLORS: Record<string, string> = {
  retail: '#10B981',
  food: '#F59E0B',
  services: '#3B82F6',
  wellness: '#EC4899',
  tech: '#8B5CF6',
};

export default function MapViewer({ location, category }: MapViewerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([location.lat, location.lng], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);
    } else {
      // Update map center
      map.current.setView([location.lat, location.lng], 9);
    }

    // Clear existing markers and circles
    map.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.current?.removeLayer(layer);
      }
    });

    // Add center marker
    L.marker([location.lat, location.lng], {
      icon: DefaultIcon,
    })
      .addTo(map.current)
      .bindPopup(`<strong>${location.state} Center</strong><br>Primary location`);

    // Add opportunity zones
    const zones = OPPORTUNITY_ZONES[category] || OPPORTUNITY_ZONES.retail;
    const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.retail;

    zones.forEach((zone, index) => {
      const zoneLocation: L.LatLngExpression = [
        location.lat + zone.lat,
        location.lng + zone.lng,
      ];

      // Add circle for opportunity zone
      L.circle(zoneLocation, {
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        weight: 2,
        radius: 25000, // 25km radius
      })
        .addTo(map.current!)
        .bindPopup(
          `<strong>${zone.name}</strong><br><span style="color: ${color};">● ${category.toUpperCase()}</span><br>High opportunity zone`
        );

      // Add markers for zones
      L.marker(zoneLocation, {
        icon: L.divIcon({
          html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px ${color}; cursor: pointer;"></div>`,
          iconSize: [18, 18],
          className: 'custom-icon',
        }),
      })
        .addTo(map.current!)
        .bindPopup(`<strong>${zone.name}</strong><br>Opportunity zone ${index + 1}`);
    });

    return () => {
      // Cleanup
    };
  }, [location, category]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}
