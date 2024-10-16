"use client";
import React, { useEffect, useState } from "react";
import { Aksebilitas } from "@/src/interface/aksebilitasProps";
import { fetchAksebilitasByTempatWisata } from "@/src/api/aksebilitasApi";

// Tambahkan properti idTempatWisata ke interface PlaceCardProps
interface PlaceCardProps {
  id: number;
  gambar: string;
  namaTempatWisata: string;
  rating: number;
  harga: number;
  aksebilitas: Aksebilitas[];
  // aksebilitasCount: number;
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ id, ...props }) => {
  const [jumlahaksebilitas, setAksebilitas] = useState<string>('');

  const loadAndFormatAksebilitas = async (tempatWisataId:number) => {
    try {
      const allAksebilitas = await fetchAksebilitasByTempatWisata();
      const filteredAksebilitas = allAksebilitas.filter(a => a.id === tempatWisataId);
      const aksebilitasFields = filteredAksebilitas.flatMap(a => {
        const fields = [];
        if (a.ramp) fields.push('Ramp');
        if (a.toiletKhusus) fields.push('Toilet Khusus');
        if (a.parkirKhususDifabel) fields.push('Parkir Khusus Difabel');
        if (a.jalanKhususDifabel) fields.push('Jalan Khusus Difabel');
        return fields;
      });

      setAksebilitas(aksebilitasFields.join(', '));
    } catch (error) {
      console.error("Failed to load aksebilitas:", error);
    }
  };

  useEffect(() => {
    loadAndFormatAksebilitas(id);
  }, [id]);

  return (
    <div onClick={props.onClick}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
        <img
          src={props.gambar}
          alt={props.namaTempatWisata}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {props.namaTempatWisata}
          </h3>
          <div className="flex items-center">
            {/* Render bintang sesuai dengan jumlah rating */}
            {Array.from({ length: Math.floor(props.rating) }).map(
              (_, index) => (
                <p key={index} className="text-sm mt-2">
                  ⭐
                </p>
              )
            )}
          </div>
          <p className="text-sm mt-2">
            Harga: Rp. {props.harga.toLocaleString("id-ID")}
          </p>
          <p className="text-sm mt-2">
            Aksebilitas: {jumlahaksebilitas}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
