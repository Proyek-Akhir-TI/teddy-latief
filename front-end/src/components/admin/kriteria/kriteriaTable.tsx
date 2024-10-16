import { Kriteria } from "@/src/interface/kriteriaProps";
import {Edit, Trash2} from "lucide-react"

interface KriteriaTableProps {
  kriteriaList: Kriteria[];
  onEdit: (kriteria: Kriteria) => void;
  onDelete: (id: number) => void;
}

const KriteriaTable = ({ kriteriaList, onEdit, onDelete }: KriteriaTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-100">
        <tr>
          <th scope="col" className="pl-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kriteria</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bobot Kriteria</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kriteria</th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {kriteriaList.map((kriteria) => (
          <tr key={kriteria.id}>
            <td className="pl-10 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-500">{kriteria.nama_kriteria}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{kriteria.bobot_kriteria}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{kriteria.Jenis_Kriteria}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
              <div className="flex justify-center space-x-4">
                <div className="relative group">
                  <button
                    onClick={() => onEdit(kriteria)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Edit Kriteria</span>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => onDelete(kriteria.id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Hapus Kriteria</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
};

export default KriteriaTable;
