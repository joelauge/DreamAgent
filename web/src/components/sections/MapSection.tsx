'use client';

import React, { useState } from 'react';
import { AnimatedContainer, InteractiveMap } from '@/components/ui';
import { getCityData } from '@/lib/cityData';

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

interface MapSectionProps {
  cityName: string;
  className?: string;
}

const MapSection: React.FC<MapSectionProps> = ({ cityName, className }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyMarker | null>(null);
  const cityData = getCityData(cityName);

  if (!cityData) {
    return null;
  }

  const handlePropertyClick = (property: PropertyMarker) => {
    setSelectedProperty(property);
    // In a real implementation, this could open a modal or navigate to property details
    console.log('Property clicked:', property);
  };

  return (
    <section className={`py-16 sm:py-20 bg-gray-50 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer animation="slide-up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore {cityData.city}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover properties and neighborhoods in {cityData.city}, {cityData.province}
          </p>
        </AnimatedContainer>

        <AnimatedContainer animation="slide-up" delay={200}>
          <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <InteractiveMap
                  cityData={cityData}
                  height="500px"
                  onPropertyClick={handlePropertyClick}
                  showPropertyMarkers={true}
                />
              </div>

              {/* City Information Panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    About {cityData.city}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {cityData.notable_fact}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Population</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cityData.population.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Founded</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cityData.founded}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Area</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cityData.area_km2.toLocaleString()} km²
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">Density</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cityData.density.toLocaleString()}/km²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Property Info */}
                {selectedProperty && (
                  <div className="bg-rose-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Selected Property
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{selectedProperty.address}</p>
                      <p className="text-lg font-bold text-rose-600">{selectedProperty.price}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{selectedProperty.beds} beds</span>
                        <span>{selectedProperty.baths} baths</span>
                        <span className="bg-white px-2 py-1 rounded">{selectedProperty.type}</span>
                      </div>
                      <button className="w-full mt-3 bg-rose-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors">
                        View Full Details
                      </button>
                    </div>
                  </div>
                )}

                {/* Map Legend */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Map Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-sm text-gray-600">Luxury Properties</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-sm text-gray-600">Condominiums</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-sm text-gray-600">Houses</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-sm text-gray-600">City Center</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default MapSection; 