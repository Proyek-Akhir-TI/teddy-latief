"use client";

import React, { useEffect, useState } from 'react';
import PlaceCard from './cardList';
import SearchBar from './search';
import { fetchTempatWisata } from '../../../api/tempatWisataApi';
import { fetchGambarByTempatWisataId } from '../../../api/gambarApi';
import { fetchAksebilitas } from '@/src/api/aksebilitasApi';
import { TempatWisata } from '../../../interface/tempatWisataProps';
import { Aksebilitas } from '../../../interface/aksebilitasProps';
import PlaceDetail from '@/src/components/dashboard/detail/detailPlace';

const PlaceList: React.FC = () => {
  const [places, setPlaces] = useState<TempatWisata[]>([]);
  const [gambar, setGambar] = useState<{ [key: number]: string }>({});
  const [aksebilitasData, setAksebilitasData] = useState<{ [key: number]: Aksebilitas[] }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<TempatWisata | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [placesData, aksebilitasData] = await Promise.all([
        fetchTempatWisata(),
        fetchAksebilitas()
      ]);
      console.log("Aksebilitas Data:", aksebilitasData); // Tambahkan untuk debugging
      setPlaces(placesData);
      
      const groupedAksebilitas = aksebilitasData.reduce((acc, curr) => {
        if (!acc[curr.tempatWisataID]) {
          acc[curr.tempatWisataID] = [];
        }
        acc[curr.tempatWisataID].push(curr);
        return acc;
      }, {} as { [key: number]: Aksebilitas[] });
      
      setAksebilitasData(groupedAksebilitas);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const getGambar = async () => {
      const gambarPromises = places.map(async (place) => {
        if (place.id === undefined) return { tempatWisataId: -1, url: '' };
        const gambarData = await fetchGambarByTempatWisataId(place.id);
        return { tempatWisataId: place.id, url: gambarData[0]?.url || '' };
      });

      const gambarResults = await Promise.all(gambarPromises);
      const gambarMap = gambarResults.reduce((acc, curr) => {
        acc[curr.tempatWisataId] = curr.url;
        return acc;
      }, {} as { [key: number]: string });

      setGambar(gambarMap);
    };

    if (places.length > 0) {
      getGambar();
    }
  }, [places]);

  const calculateMOORAScore = (place: TempatWisata): number => {
    let score = 0;

    if (selectedCriteria.includes('aksesbilitas')) {
      score += (aksebilitasData[place.id!]?.length || 0) * 2; // Berikan bobot lebih tinggi untuk aksebilitas
    }
    if (selectedCriteria.includes('rating')) {
      score += place.rating;
    }
    if (selectedCriteria.includes('harga')) {
      score += 1 / place.harga; // Asumsikan harga lebih rendah lebih baik
    }
    if (selectedCriteria.includes('jarak')) {
      score += 1 / (place.jarak || 1); // Asumsikan jarak lebih dekat lebih baik
    }

    return score;
  };

  const sortPlacesByRecommendations = (places: TempatWisata[], recommendations: any[]) => {
    const recommendationMap = recommendations.reduce((acc, rec, index) => {
      acc[rec.tempatWisata] = index;
      return acc;
    }, {} as { [key: string]: number });

    return places.sort((a, b) => {
      const indexA = recommendationMap[a.namaTempatWisata] ?? places.length;
      const indexB = recommendationMap[b.namaTempatWisata] ?? places.length;
      return indexA - indexB;
    });
  };

  const filteredPlaces = sortPlacesByRecommendations(
    places.filter((place) => place.namaTempatWisata.toLowerCase().includes(searchTerm.toLowerCase())),
    recommendations
  );

  const handleCardClick = (place: TempatWisata) => {
    setSelectedPlace(place);
  };

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">LIST TEMPAT WISATA DISABILITAS</h2>
      <SearchBar 
        onSearch={setSearchTerm} 
        onCriteriaChange={setSelectedCriteria} 
        onRecommendationsChange={setRecommendations}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-6">
        {filteredPlaces.map((place) => {
          const image = place.id !== undefined ? (gambar[place.id] || '') : '';
          const aksebilitasCount = aksebilitasData[place.id!]?.length || 0;
          return (
            <PlaceCard 
              key={place.id ?? -1} 
              id={place.id ?? -1} 
              gambar={image} 
              namaTempatWisata={place.namaTempatWisata}
              rating={place.rating}
              harga={place.harga}
              onClick={() => handleCardClick(place)}
              aksebilitas={aksebilitasData[place.id!] || []} // Pastikan ini diteruskan dengan benar
            />
          );
        })}
      </div>
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PlaceDetail
            key={selectedPlace.id}
            tempatWisata={selectedPlace} // Ensure 'tempatWisata' is defined in PlaceDetailProps
            gambar={gambar[selectedPlace.id!] || ''} // Added 'gambar' prop
            // specific aksebilitas data
            aksebilitas={aksebilitasData[selectedPlace.id!] || []}
            onClose={() => setSelectedPlace(null)}
          />
        </div>
      )}
    </section>
  );
};

export default PlaceList;