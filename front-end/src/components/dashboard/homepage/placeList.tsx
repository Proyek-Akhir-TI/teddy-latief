"use client";

import React, { useEffect, useState } from 'react';
import PlaceCard from './placeCard';
// Pastikan jalur ini benar
import { fetchTempatWisata } from '../../../api/tempatWisataApi';
import { fetchGambarByTempatWisataId } from '../../../api/gambarApi';
// Pastikan TempatWisata diekspor dengan benar dari file ini
import { TempatWisata } from '../../../interface/tempatWisataProps';

const PlaceList: React.FC = () => {
  const [places, setPlaces] = useState<TempatWisata[]>([]);
  const [gambar, setGambar] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    async function getPlaces() {
      const data = await fetchTempatWisata();
      setPlaces(data.slice(0, 6)); // Menampilkan hanya 6 tempat wisata
    }
    getPlaces();
  }, []);

  useEffect(() => {
    async function getGambar() {
      const gambarPromises = places.map(async (place) => {
        if (place.id === undefined) return { tempatWisataId: -1, url: '' }; // Handle undefined id
        const gambarData = await fetchGambarByTempatWisataId(place.id);
        return { tempatWisataId: place.id, url: gambarData[0]?.url || '' }; // Ambil URL dari gambar pertama
      });

      const gambarResults = await Promise.all(gambarPromises);
      const gambarMap = gambarResults.reduce((acc, curr) => {
        acc[curr.tempatWisataId] = curr.url;
        return acc;
      }, {} as { [key: number]: string });

      setGambar(gambarMap);
    }

    if (places.length > 0) {
      getGambar();
    }
  }, [places]);

  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-6">TEMPAT WISATA RAMAH DISABILITAS DI KABUPATEN BANYUWANGI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {places.map((place) => {
          const image = place.id !== undefined ? (gambar[place.id] || '') : '';
          return (
            <PlaceCard 
              key={place.id} 
              name={place.namaTempatWisata} 
              image={image} 
            />
          );
        })}
      </div>
      {/* <div className="text-end mt-6">
        <a href="/tempat-wisata" className="text-blue-500">Lihat selengkapnya &gt;</a>
      </div> */}
    </section>
  );
};

export default PlaceList;