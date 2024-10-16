"use client";
import React, { useEffect, useState } from "react";
import { TempatWisata } from "../../../interface/tempatWisataProps";
import { fetchGambarByTempatWisataId } from "@/src/api/gambarApi";
import { Gambar } from "@/src/interface/gambarProps";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Aksebilitas } from "@/src/interface/aksebilitasProps";
import { fetchAksebilitasByTempatWisata } from "@/src/api/aksebilitasApi";

interface PlaceDetailProps {
  tempatWisata: TempatWisata;
  gambar: string;
  aksebilitas: Aksebilitas[]; // Pastikan ini mendefinisikan array dari Aksebilitas
  onClose: () => void;
}

const calculateAksebilitas = (aksebilitasData: Aksebilitas[]): number => {
  return aksebilitasData.reduce((sum, curr) => {
    return sum + (curr.ramp ? 1 : 0) + (curr.toiletKhusus ? 1 : 0) + (curr.parkirKhususDifabel ? 1 : 0) + (curr.jalanKhususDifabel ? 1 : 0);
  }, 0);
};

const PlaceDetail: React.FC<PlaceDetailProps> = ({ tempatWisata, onClose }) => {
  const [gambars, setGambar] = useState<Gambar[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [jumlahAksebilitas, setJumlahAksebilitas] = useState<string>('');

  const getAksebilitas = async (tempatWisataId: number) => {
    try {
      // console.log(`Mengambil data aksebilitas untuk tempat wisata dengan ID: ${tempatWisataId}`);
      const aksebilitas = await fetchAksebilitasByTempatWisata();
      // console.log('Data Aksebilitas:', aksebilitas);

      const aksebilitasData = aksebilitas.filter(a => a.id === tempatWisataId);

      if (aksebilitasData.length === 0) {
        console.log(`Tidak ada aksebilitas untuk Tempat Wisata ID: ${tempatWisataId}`);
      }

      const aksebilitasFields = aksebilitasData.flatMap(a => {
        const fields = [];
        if (a.ramp) fields.push('Ramp');
        if (a.toiletKhusus) fields.push('Toilet Khusus');
        if (a.parkirKhususDifabel) fields.push('Parkir Khusus Difabel');
        if (a.jalanKhususDifabel) fields.push('Jalan Khusus Difabel');
        return fields;
      });

      setJumlahAksebilitas(aksebilitasFields.join(', '));
    } catch (error) {
      console.error("Error fetching aksebilitas data:", error);
    }
  };

  useEffect(() => {
    const getGambar = async () => {
      const gambarData = await fetchGambarByTempatWisataId(tempatWisata.id ?? -1);
      setGambar(gambarData);
    };
    getGambar();
  }, [tempatWisata.id]);

  useEffect(() => {
    getAksebilitas(tempatWisata.id ?? -1);
  }, [tempatWisata.id]);

  // Fungsi untuk geser ke gambar berikutnya
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gambars.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fungsi untuk geser ke gambar sebelumnya
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gambars.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 float-right"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {tempatWisata.namaTempatWisata}
        </h2>

        {/* Tampilkan gambar-gambar yang diambil dengan tombol geser */}
        <div className="relative mb-4">
          {gambars.length > 0 ? (
            <>
              <img
                src={gambars[currentImageIndex].url}
                alt={`${tempatWisata.namaTempatWisata} - ${currentImageIndex + 1}`}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white"
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada gambar tersedia
            </p>
          )}
        </div>

        <p className="mb-2">
          <strong>Jenis Wisata:</strong> {tempatWisata.jenisWisata}
        </p>
        <p className="mb-2 flex items-center">
          <strong>Rating:</strong>{" "}
          {Array.from({ length: Math.floor(tempatWisata.rating) }).map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </p>
        <p className="mb-2">
          <strong>Harga:</strong> Rp. {tempatWisata.harga.toLocaleString("id-ID")}
        </p>
        <p className="mb-2">
          <strong>Aksebilitas:</strong> {jumlahAksebilitas}
        </p>
        <p>
          <strong>Deskripsi:</strong> {tempatWisata.deskripsi}
        </p>
      </div>
    </div>
  );
};

export default PlaceDetail;