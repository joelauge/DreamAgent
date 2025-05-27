// City data utilities for parsing and working with Canadian city information

export interface CityData {
  city: string;
  population: number;
  province: string;
  area_km2: number;
  density: number;
  founded: number;
  notable_fact: string;
  latitude: number;
  longitude: number;
  google_maps_url: string;
  map_definition: string;
}

// Sample city data for Toronto (our default city)
export const TORONTO_DATA: CityData = {
  city: 'Toronto',
  population: 2600000,
  province: 'Ontario',
  area_km2: 630.2,
  density: 4126.3,
  founded: 1793,
  notable_fact: 'Largest city in Canada and provincial capital of Ontario. Home to the CN Tower.',
  latitude: 43.6532,
  longitude: -79.3832,
  google_maps_url: 'https://www.google.com/maps?q=43.6532,-79.3832',
  map_definition: '<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=43.6532,-79.3832&key=YOUR_API_KEY"></iframe>'
};

// Function to get city data by name
export function getCityData(cityName: string): CityData | null {
  // For now, return Toronto data as default
  // In a real implementation, this would parse the CSV or fetch from an API
  if (cityName.toLowerCase() === 'toronto') {
    return TORONTO_DATA;
  }
  return TORONTO_DATA; // Default to Toronto for demo
}

// Function to get nearby cities (mock implementation)
export function getNearbyListings(cityData: CityData) {
  // Mock property listings near the city center
  return [
    {
      id: 'map-1',
      latitude: cityData.latitude + 0.01,
      longitude: cityData.longitude + 0.01,
      address: '123 King Street West',
      price: '$1,250,000',
      beds: 2,
      baths: 2,
      type: 'Condo'
    },
    {
      id: 'map-2',
      latitude: cityData.latitude - 0.02,
      longitude: cityData.longitude + 0.015,
      address: '456 Maple Avenue',
      price: '$950,000',
      beds: 3,
      baths: 2,
      type: 'House'
    },
    {
      id: 'map-3',
      latitude: cityData.latitude + 0.015,
      longitude: cityData.longitude - 0.01,
      address: '789 Harbourfront Drive',
      price: '$2,100,000',
      beds: 3,
      baths: 3,
      type: 'Luxury Condo'
    }
  ];
} 