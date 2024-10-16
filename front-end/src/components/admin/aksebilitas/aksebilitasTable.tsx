import { Aksebilitas } from "@/src/interface/aksebilitasProps";
import { Edit, Trash2 } from "lucide-react";

interface AksebilitasListProps {
  aksebilitasList: Aksebilitas[];
  onEdit: (aksebilitas: Aksebilitas) => void;
  onDelete: (id: number) => void;
}

const AksebilitasList: React.FC<AksebilitasListProps> = ({
  aksebilitasList,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full divide-y bg-gray-200">
      <thead className="bg-blue-100 text-center">
        <tr>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ramp
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Toilet Khusus
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Parkir Khusus Difabel
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jalan Khusus Difabel
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-center">
        {aksebilitasList.map((aksebilitas) => (
          <tr key={aksebilitas.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
              {aksebilitas.ramp ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
              {aksebilitas.toiletKhusus ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
              {aksebilitas.parkirKhususDifabel ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
              {aksebilitas.jalanKhususDifabel ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex justify-center space-x-4">
                <div className="relative group">
                  <button
                    onClick={() => onEdit(aksebilitas)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => onDelete(aksebilitas.id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AksebilitasList;
