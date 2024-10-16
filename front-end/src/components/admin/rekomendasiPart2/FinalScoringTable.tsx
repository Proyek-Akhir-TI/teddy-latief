import React from 'react';
// import { TempatWisata, Kriteria, Aksebilitas } from '@/interface/tempatWisataProps';
import { TempatWisata } from '@/src/interface/tempatWisataProps';
import { Kriteria } from '@/src/interface/kriteriaProps';
import { Aksebilitas } from '@/src/interface/aksebilitasProps';

interface FinalScoringTableProps {
  tempatWisata: TempatWisata[];
  kriteria: Kriteria[];
  aksesibilitas: Aksebilitas[];
}

const FinalScoringTable: React.FC<FinalScoringTableProps> = ({ tempatWisata, kriteria, aksesibilitas }) => {
  const calculateFinalScore = () => {
    return tempatWisata.map((tempat) => {
      const score = kriteria.reduce((acc, kriteria, index) => {
        const value = (kriteria.nama_kriteria === 'harga') ? tempat.harga : tempat.rating;
        const normalizedValue = kriteria.Jenis_Kriteria === 'Benefit' ? value / 5 : 5 / value;
        return acc + normalizedValue * kriteria.bobot_kriteria;
      }, 0);
      return { ...tempat, score };
    });
  };

  const finalScores = calculateFinalScore();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Langkah 2: Skoring Akhir</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Tempat Wisata</th>
            <th className="border border-gray-200 p-2">Skor Akhir</th>
          </tr>
        </thead>
        <tbody>
          {finalScores.map((tempat, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2">{tempat.namaTempatWisata}</td>
              <td className="border border-gray-200 p-2">{tempat.score.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalScoringTable;
