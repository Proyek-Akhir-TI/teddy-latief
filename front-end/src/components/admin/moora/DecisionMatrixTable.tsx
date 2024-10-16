import React, { useEffect, useState, Dispatch, SetStateAction, useCallback } from 'react';
import { fetchTempatWisata } from '@/src/api/tempatWisataApi';
import { fetchKriteria } from '@/src/api/kriteriaApi';
import { fetchAksebilitasByTempatWisata } from '@/src/api/aksebilitasApi';
import { Aksebilitas } from '@/src/interface/aksebilitasProps';
import { haversineDistance } from '@/src/utils/haversine';

interface DecisionMatrixRow {
  tempatWisata: string;
  aksebilitas: number;
  rating: number;
  harga: number;
  jarak: number;
}

interface DecisionMatrixProps {
  setDecisionMatrix: Dispatch<SetStateAction<DecisionMatrixRow[]>>;
}

const DecisionMatrixTable: React.FC<DecisionMatrixProps> = ({ setDecisionMatrix }) => {
  const [matrix, setMatrix] = useState<DecisionMatrixRow[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  // Titik awal dengan koordinat -8.3971728, 114.2272898
  // koordinat kampus -8.29155842, 114.30746729
  // -8.294079855273814, 114.30695231590711
  const defaultUserCoordinates: [number, number] = [-8.29407985, 114.30695231];

  console.log("Default User Coordinates:", defaultUserCoordinates);


  const calculateAksebilitasScore = (aksebilitasData: Aksebilitas[]) => {
    return aksebilitasData.reduce((sum, curr) => {
      return sum + (curr.ramp ? 1 : 0) + (curr.toiletKhusus ? 1 : 0) + (curr.parkirKhususDifabel ? 1 : 0) + (curr.jalanKhususDifabel ? 1 : 0);
    }, 0);
  };

  const fetchData = useCallback(async () => {
    if (dataFetched) return;

    try {
      const tempatWisata = await fetchTempatWisata();
      const kriteria = await fetchKriteria();
      const aksebilitas = await fetchAksebilitasByTempatWisata();
      console.log('Data Aksebilitas:', aksebilitas);
      console.log('Data Tempat Wisata:', tempatWisata);

      const decisionMatrix = tempatWisata.map((tw) => {
        const aksebilitasData = aksebilitas.filter(a => a.id === tw.id);

        if (aksebilitasData.length === 0) {
          console.log(`Tidak ada aksebilitas untuk Tempat Wisata ID: ${tw.id}`);
        }

        const aksebilitasScore = calculateAksebilitasScore(aksebilitasData);
        const distance = haversineDistance(defaultUserCoordinates, [parseFloat(tw.koordinat[1]), parseFloat(tw.koordinat[0])]);

        return {
          tempatWisata: tw.namaTempatWisata,
          aksebilitas: aksebilitasScore,
          rating: tw.rating,
          harga: tw.harga,
          jarak: distance,
        };
      });

      setMatrix(decisionMatrix);
      setDecisionMatrix(decisionMatrix);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setDecisionMatrix, dataFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Matriks Keputusan Awal</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-center">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Wisata</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Aksebilitas</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Jarak (km)</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {matrix.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.tempatWisata}</td>
                <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.aksebilitas}</td>
                <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.rating}</td>
                <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.harga}</td>
                <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.jarak.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DecisionMatrixTable;
