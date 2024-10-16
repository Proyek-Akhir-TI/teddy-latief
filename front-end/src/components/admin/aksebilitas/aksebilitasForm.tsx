import { useState, useEffect, FormEvent } from 'react';
import { Aksebilitas } from '@/src/interface/aksebilitasProps';
import { TempatWisata } from '@/src/interface/tempatWisataProps';
import { fetchTempatWisata } from '@/src/api/tempatWisataApi'; // Impor API

interface AksebilitasFormProps {
  onSubmit: (aksebilitas: Aksebilitas) => void;
  initialData?: Aksebilitas;
  onClose: () => void;
}

const AksebilitasForm: React.FC<AksebilitasFormProps> = ({ onSubmit, initialData, onClose }) => {
  const [formData, setFormData] = useState<Aksebilitas>({
    ramp: false,
    toiletKhusus: false,
    parkirKhususDifabel: false,
    jalanKhususDifabel: false,
    tempatWisataID: 0,
  });

  const [tempatWisataList, setTempatWisataList] = useState<TempatWisata[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTempatWisata();
        setTempatWisataList(data);
      } catch (error) {
        console.error('Error fetching tempat wisata:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl text-center font-semibold mb-6 text-gray-700">Aksebilitas Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['ramp', 'toiletKhusus', 'parkirKhususDifabel', 'jalanKhususDifabel'].map((field) => (
            <div key={field} className="flex items-center space-x-4">
              <label htmlFor={field} className="w-1/2 text-left capitalize text-gray-600">
                {field} :
              </label>
              <input
                type="checkbox"
                id={field}
                name={field}
                checked={formData[field as keyof Aksebilitas] as boolean}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <label htmlFor="tempatWisataID" className="w-1/3 text-left text-gray-600">Tempat Wisata:</label>
            <select
              id="tempatWisataID"
              name="tempatWisataID"
              value={formData.tempatWisataID}
              onChange={handleChange}
              className="form-select w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value={0}>Pilih Tempat Wisata</option>
              {tempatWisataList.map((tempatWisata) => (
                <option key={tempatWisata.id} value={tempatWisata.id}>
                  {tempatWisata.namaTempatWisata}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AksebilitasForm;
