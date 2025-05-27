'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CityData, getNearbyListings } from '@/lib/cityData';

// Leaflet imports - using dynamic imports to avoid SSR issues
let L: any;
let MapContainer: any;
let TileLayer: any;
let Marker: any;
let Popup: any;

interface PropertyMarker {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  price: string;
  beds: number;
  baths: number;
  type: string;
}

interface InteractiveMapProps {
  cityData: CityData;
  height?: string;
  className?: string;
  showPropertyMarkers?: boolean;
  onPropertyClick?: (property: PropertyMarker) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  cityData,
  height = '400px',
  className,
  showPropertyMarkers = true,
  onPropertyClick,
}) => {
  const mapRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [properties] = useState<PropertyMarker[]>(getNearbyListings(cityData));

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined') {
        const leaflet = await import('leaflet');
        const reactLeaflet = await import('react-leaflet');
        
        L = leaflet.default;
        MapContainer = reactLeaflet.MapContainer;
        TileLayer = reactLeaflet.TileLayer;
        Marker = reactLeaflet.Marker;
        Popup = reactLeaflet.Popup;

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        setIsLoaded(true);
      }
    };

    loadLeaflet();
  }, []);

  // Custom property marker icon
  const createPropertyIcon = (type: string) => {
    if (!L) return null;
    
    const color = type === 'Luxury Condo' ? '#f43f5e' : type === 'Condo' ? '#3b82f6' : '#10b981';
    
    return L.divIcon({
      className: 'custom-property-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          font-weight: bold;
        ">
          $
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  if (!isLoaded) {
    return (
      <div 
        className={cn(
          'bg-gray-100 rounded-2xl flex items-center justify-center',
          className
        )}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative rounded-2xl overflow-hidden shadow-card', className)}>
      <MapContainer
        center={[cityData.latitude, cityData.longitude]}
        zoom={12}
        style={{ height, width: '100%' }}
        ref={mapRef}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* City center marker */}
        <Marker position={[cityData.latitude, cityData.longitude]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{cityData.city}, {cityData.province}</h3>
              <p className="text-sm text-gray-600 mt-1">{cityData.notable_fact}</p>
              <div className="mt-2 text-xs text-gray-500">
                <p>Population: {cityData.population.toLocaleString()}</p>
                <p>Founded: {cityData.founded}</p>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Property markers */}
        {showPropertyMarkers && properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createPropertyIcon(property.type)}
            eventHandlers={{
              click: () => onPropertyClick?.(property),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h4 className="font-semibold text-gray-900">{property.address}</h4>
                <p className="text-lg font-bold text-rose-600 mt-1">{property.price}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.type}</span>
                </div>
                <button 
                  className="mt-3 w-full bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors"
                  onClick={() => onPropertyClick?.(property)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
              <span>Luxury</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Condo</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>House</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 