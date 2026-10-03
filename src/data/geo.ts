// Geographic coordinate overlay for document locations.
// Kept separate from the auto-generated catalog files (documents.ts, release-0X-documents.ts)
// so that re-running scripts/catalog.mjs never wipes these coordinates.
//
// precision:
//   'exact'  — a specific named place (city, base, facility)
//   'approx' — a country or named body of water; centroid shown
//   'region' — a broad operational area (e.g. CENTCOM AOR); indicative centroid only

export type GeoPrecision = 'exact' | 'approx' | 'region';

export interface GeoPoint {
  lat: number;
  lng: number;
  precision: GeoPrecision;
  note?: string;
}

/** Location name (as it appears in document data) → coordinates. */
export const GEO_OVERLAY: Record<string, GeoPoint> = {
  // Exact places
  'Colorado Springs': { lat: 38.83, lng: -104.82, precision: 'exact' },
  'Budapest': { lat: 47.5, lng: 19.04, precision: 'exact' },
  'Sary Shagan': { lat: 46.37, lng: 72.87, precision: 'exact', note: 'Soviet-era test range, Kazakhstan' },
  'Los Alamos, New Mexico': { lat: 35.88, lng: -106.3, precision: 'exact' },
  'Pantex Plant, Texas': { lat: 35.32, lng: -101.56, precision: 'exact' },

  // Release 05 locations
  'Bagram, Afghanistan': { lat: 34.95, lng: 69.27, precision: 'exact', note: 'Bagram Airfield' },
  'Colorado Springs, Colorado': { lat: 38.83, lng: -104.82, precision: 'exact' },
  'Bahia, Brazil': { lat: -12.97, lng: -38.5, precision: 'approx' },
  'Afghanistan': { lat: 33.9, lng: 67.7, precision: 'approx' },
  'Sweden': { lat: 60.1, lng: 18.6, precision: 'approx' },
  'Gulf of Oman': { lat: 24.8, lng: 58.5, precision: 'approx' },
  'Pacific Ocean': { lat: 20.0, lng: -140.0, precision: 'approx' },
  'Caribbean Sea (near Puerto Rico)': { lat: 18.2, lng: -66.5, precision: 'approx' },
  'Montana & Utah, USA': { lat: 44.5, lng: -110.5, precision: 'region', note: 'Great Falls (1950) and Tremonton (1952) film locations' },

  // Release 06 locations
  'Tremonton, Utah': { lat: 41.71, lng: -111.91, precision: 'exact' },
  'Washington, D.C.': { lat: 38.9, lng: -77.04, precision: 'exact' },
  'Las Vegas, Nevada': { lat: 36.17, lng: -115.14, precision: 'approx', note: 'AAWSAP contracting location' },
  'Boston, Massachusetts': { lat: 42.36, lng: -71.06, precision: 'exact' },
  'Colorado': { lat: 39.0, lng: -105.5, precision: 'approx' },
  'Iraq': { lat: 33.2, lng: 43.7, precision: 'approx' },

  // Countries / seas (centroids)
  'Djibouti': { lat: 11.6, lng: 43.1, precision: 'approx' },
  'Greece': { lat: 39.0, lng: 22.0, precision: 'approx' },
  'Kazakhstan': { lat: 48.0, lng: 66.9, precision: 'approx' },
  'Papua New Guinea': { lat: -6.3, lng: 143.9, precision: 'approx' },
  'Syria': { lat: 35.0, lng: 38.5, precision: 'approx' },
  'United Kingdom': { lat: 54.0, lng: -2.0, precision: 'approx' },
  'Australia': { lat: -25.3, lng: 133.8, precision: 'approx' },
  'United States': { lat: 39.8, lng: -98.6, precision: 'approx' },
  'New Mexico': { lat: 34.5, lng: -106.0, precision: 'approx' },
  'Texas': { lat: 31.0, lng: -99.0, precision: 'approx' },
  'Yellow Sea': { lat: 35.5, lng: 123.0, precision: 'approx' },
  'East China Sea': { lat: 29.0, lng: 125.0, precision: 'approx' },
  'North Atlantic Ocean': { lat: 45.0, lng: -40.0, precision: 'approx' },
  'Atlantic Ocean': { lat: 30.0, lng: -45.0, precision: 'approx' },

  // Broad regions and command areas (indicative centroids)
  'Middle East': { lat: 29.0, lng: 45.0, precision: 'region' },
  'Indo-Pacific': { lat: 10.0, lng: 140.0, precision: 'region' },
  'Western United States': { lat: 39.5, lng: -112.0, precision: 'region', note: 'AARO Western U.S. event area is not publicly disclosed' },
  'Northeastern United States': { lat: 42.5, lng: -73.5, precision: 'region' },
  'Southeastern United States': { lat: 32.0, lng: -83.0, precision: 'region' },
  'Midwestern United States': { lat: 41.5, lng: -93.0, precision: 'region' },
  'Eastern United States': { lat: 38.5, lng: -79.0, precision: 'region' },
  'USSR': { lat: 56.0, lng: 61.0, precision: 'region', note: 'Historical designation' },
  'Ladakh, Nepal, Sikkim, and Bhutan': { lat: 29.5, lng: 85.0, precision: 'region' },
  'CENTCOM': { lat: 26.5, lng: 52.5, precision: 'region', note: 'U.S. Central Command area of responsibility' },
  'NORTHCOM': { lat: 45.0, lng: -100.0, precision: 'region', note: 'U.S. Northern Command area of responsibility' },
  'EUCOM': { lat: 50.0, lng: 15.0, precision: 'region', note: 'U.S. European Command area of responsibility' },
  'AFRICOM': { lat: 5.0, lng: 20.0, precision: 'region', note: 'U.S. Africa Command area of responsibility' },
  'INDOPACOM': { lat: 5.0, lng: 150.0, precision: 'region', note: 'U.S. Indo-Pacific Command area of responsibility' },
};

/** Locations that cannot be placed on a ground map (orbital/space records, undisclosed video releases). */
export const UNMAPPABLE_LOCATIONS = new Set([
  'Space',
  'Low Earth Orbit',
  'Low Earth orbit (STS-80)',
  'Cislunar Space',
  'AARO video release',
  'DOD UAP video release',
  'Various',
]);
