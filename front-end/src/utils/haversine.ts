import axios from 'axios'; // Tambahkan ini di bagian atas file

// import { TempatWisata } from '@/src/interface/tempatWisataProps';
// import { Kriteria } from '@/src/interface/kriteriaProps';

// export const calculateMOORA = (
//   tempatWisata: TempatWisata[],
//   kriteria: Kriteria[]
// ): {
//   normalizedData: { tempatWisata: TempatWisata; normalizedValues: number[] }[];
//   optimizedData: { tempatWisata: TempatWisata; benefitScore: number; costScore: number; netScore: number }[];
//   scoringData: { tempatWisata: TempatWisata; score: number }[];
// } => {

//   // Step 1: Normalization
//   const normalizedData = tempatWisata.map((tempat) => {
//     const normalizedValues = kriteria.map((kriteria) => {
//       const value = tempat[kriteria.nama_kriteria as keyof TempatWisata];
//       const sumOfSquares = tempatWisata.reduce((sum, item) => {
//         return sum + Math.pow(item[kriteria.nama_kriteria as keyof TempatWisata] as number, 2);
//       }, 0);

//       return (value as number) / Math.sqrt(sumOfSquares);
//     });

//     return { tempatWisata: tempat, normalizedValues };
//   });

//   // Step 2: Optimization
//   const optimizedData = normalizedData.map(({ tempatWisata, normalizedValues }) => {
//     const benefitScore = normalizedValues
//       .map((value, index) => (kriteria[index].Jenis_Kriteria === 'Benefit' ? value : 0))
//       .reduce((sum, value) => sum + value, 0);

//     const costScore = normalizedValues
//       .map((value, index) => (kriteria[index].Jenis_Kriteria === 'Cost' ? value : 0))
//       .reduce((sum, value) => sum + value, 0);

//     const netScore = benefitScore - costScore;

//     return { tempatWisata, benefitScore, costScore, netScore };
//   });

//   // Step 3: Scoring
//   const scoringData = optimizedData
//     .map(({ tempatWisata, netScore }) => ({ tempatWisata, score: netScore }))
//     .sort((a, b) => b.score - a.score);

//   return { normalizedData, optimizedData, scoringData };
// };

import L from 'leaflet';
import 'leaflet-routing-machine';

// Fungsi untuk menghitung rute dan jarak menggunakan Leaflet Routing Machine
export const calculateRouteDistance = (coords1: [number, number], coords2: [number, number], callback: (distance: number) => void) => {
  const from = L.latLng(coords1[0], coords1[1]);
  const to = L.latLng(coords2[0], coords2[1]);

  L.Routing.control({
    waypoints: [from, to],
    router: L.Routing.osrmv1({
      serviceUrl: `https://router.project-osrm.org/route/v1`
    }),
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
      extendToWaypoints: true, // Menentukan apakah garis harus diperpanjang ke waypoint
      missingRouteTolerance: 10 // Toleransi untuk rute yang hilang dalam piksel
    },
    // createMarker: () => null, // Tidak membuat marker
    show: false, // Tidak menampilkan rute di peta
  }).on('routesfound', function (e) {
    const routes = e.routes;
    const distance = routes[0].summary.totalDistance / 1000; // Konversi dari meter ke kilometer
    callback(distance); // Panggil callback dengan jarak
  }).addTo(new L.Map('tempMap').setView([0, 0], 1)); // Tambahkan ke peta sementara
};

// Fungsi lainnya tetap sama

// src/utils/haversine.ts
export const haversineDistance = (coords1: [number, number], coords2: [number, number]) => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371; // Radius bumi dalam kilometer
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Jarak dalam kilometer
};

export const euclideanDistance = (coords1: [number, number], coords2: [number, number]) => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  return Math.sqrt(dLat * dLat + dLon * dLon);
};


export const vincentyDistance = (coords1: [number, number], coords2: [number, number]) => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const a = 6378137; // Semi-major axis of the Earth (in meters)
  const f = 1 / 298.257223563; // Flattening of the ellipsoid
  const b = 6356752.314245; // Semi-minor axis

  const L = toRad(lon2 - lon1);
  const U1 = Math.atan((1 - f) * Math.tan(toRad(lat1)));
  const U2 = Math.atan((1 - f) * Math.tan(toRad(lat2)));

  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let lambda = L;
  let lambdaP;
  let iterLimit = 100;
  let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, C;
  let uSq, A, B, deltaSigma;

  do {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      (cosU2 * sinLambda) * (cosU2 * sinLambda) +
      (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    );

    if (sinSigma === 0) return 0; // Co-incident points

    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

    C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha *
      (sigma + C * sinSigma *
        (cos2SigmaM + C * cosSigma *
          (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

  if (iterLimit === 0) return NaN; // Formula failed to converge

  uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 *
    (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) *
      (-3 + 4 * cos2SigmaM * cos2SigmaM)));

  const s = b * A * (sigma - deltaSigma);

  return s / 1000; // Return distance in kilometers
};

const toRad = (x: number) => (x * Math.PI) / 180;

export const sphericalLawOfCosinesDistance = (coords1: [number, number], coords2: [number, number]) => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371; // Radius bumi dalam kilometer
  const d = Math.acos(
    Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1))
  ) * R;

  return d; // Jarak dalam kilometer
};


export const chebyshevDistance = (coords1: [number, number], coords2: [number, number]) => {
  const [x1, y1] = coords1;
  const [x2, y2] = coords2;

  return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
};


export const manhattanDistance = (coords1: [number, number], coords2: [number, number]) => {
  const [x1, y1] = coords1;
  const [x2, y2] = coords2;

  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};
