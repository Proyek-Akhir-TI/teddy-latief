import { TempatWisata } from "@/src/interface/tempatWisataProps";
import { Trash2, Edit, ImagePlus, Images } from "lucide-react";

interface TempatWisataTableProps {
  tempatWisataList: TempatWisata[];
  onEdit: (tempatWisata: TempatWisata) => void;
  onDelete: (id: number) => void;
  onTambahGambar: (tempatWisataId: number) => void;
  onLihatGambar: (tempatWisataId: number) => void;
}

const TempatWisataTable = ({
  tempatWisataList,
  onEdit,
  onDelete,
  onTambahGambar,
  onLihatGambar,
}: TempatWisataTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tempat Wisata</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Koordinat</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Wisata</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tempatWisataList.map((tempatWisata) => (
          <tr key={tempatWisata.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{tempatWisata.namaTempatWisata}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tempatWisata.koordinat.join(', ')}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{tempatWisata.rating}</td>
            <td className="px-2 py-2 whitespace-nowrap text-center text-sm text-gray-500">Rp.{tempatWisata.harga.toLocaleString('id-ID')}</td>
            <td className="px-6 py-2 whitespace-nowrap text-center text-sm text-gray-500">{tempatWisata.jenisWisata}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="flex justify-center space-x-4">
                <div className="relative group">
                  <button 
                    onClick={() => onTambahGambar(tempatWisata.id!)}
                    className="text-indigo-600 hover:text-indigo-700"
                  > 
                    <ImagePlus className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Tambah Gambar
                  </span>
                </div>
                <div className="relative group">
                  <button 
                    onClick={() => onLihatGambar(tempatWisata.id!)}
                    className="text-green-600 hover:text-green-700"
                  > 
                    <Images className="w-5 h-5"/>
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Gambar
                  </span>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="flex justify-center space-x-4">
                <div className="relative group">
                  <button
                    onClick={() => onEdit(tempatWisata)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Edit Tempat Wisata</span>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => onDelete(tempatWisata.id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Hapus Tempat Wisata</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TempatWisataTable;
