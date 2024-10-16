import React, { useEffect, useState } from "react";
import { fetchGambarByTempatWisataId } from "@/src/api/gambarApi"; // Asumsi ini adalah API untuk fetch gambar berdasarkan tempatWisataId
import { Gambar } from "@/src/interface/gambarProps";

interface LihatGambarOverlayProps {
  tempatWisataId: number;
  onClose: () => void;
}

const LihatGambarOverlay: React.FC<LihatGambarOverlayProps> = ({ tempatWisataId, onClose }) => {
  const [gambars, setGambars] = useState<Gambar[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGambarByTempatWisataId(tempatWisataId);
      setGambars(data);
    };
    loadData();
  }, [tempatWisataId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-xl mb-4">Gambar untuk Tempat Wisata {tempatWisataId}</h2>
        <ul className="space-y-2 grid grid-cols-2 gap-4">
          {gambars.map((gambar) => (
            <li key={gambar.id} className="border p-2 rounded flex justify-center items-center">
              <img 
                src={gambar.url} 
                alt="Gambar" 
                className="w-32 h-32 object-cover rounded"
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LihatGambarOverlay;
