import React, { useState } from "react";
import { createGambar } from "@/src/api/gambarApi";
import { Gambar } from "@/src/interface/gambarProps";

interface TambahGambarOverlayProps {
  tempatWisataId: number;
  onClose: () => void;
}

const TambahGambarOverlay: React.FC<TambahGambarOverlayProps> = ({ tempatWisataId, onClose }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    const newGambar: Gambar = { tempatWisataID: tempatWisataId, url };
    await createGambar(newGambar);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Tambah Gambar</h2>
        <input
          type="text"
          placeholder="URL Gambar"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahGambarOverlay;
