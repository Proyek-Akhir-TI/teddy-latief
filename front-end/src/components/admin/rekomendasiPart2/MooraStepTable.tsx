import React from 'react';
// import { TempatWisata, Kriteria, Aksebilitas } from '@/interface/tempatWisataProps';
import { TempatWisata } from '@/src/interface/tempatWisataProps';
import { Kriteria } from '@/src/interface/kriteriaProps';
import { Aksebilitas } from '@/src/interface/aksebilitasProps';

interface MooraStepTableProps {
  tempatWisata: TempatWisata[];
  kriteria: Kriteria[];
  aksesibilitas: Aksebilitas[];
}

const MooraStepTable: React.FC<MooraStepTableProps> = ({ tempatWisata, kriteria, aksesibilitas }) => {
  const normalisasi = () => {
    return tempatWisata.map((tempat) => {
      const normalizedValues = kriteria.map((kriteria) => {
        const value = (kriteria.nama_kriteria === 'harga') ? tempat.harga : tempat.rating;
        return kriteria.Jenis_Kriteria === 'Benefit' ? value / 5 : 5 / value;
      });
      return { ...tempat, normalizedValues };
    });
  };

  const dataNormalisasi = normalisasi();

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Langkah 1: Normalisasi</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Tempat Wisata</th>
            {kriteria.map((k, index) => (
              <th key={index} className="border border-gray-200 p-2">{k.nama_kriteria}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataNormalisasi.map((tempat, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2">{tempat.namaTempatWisata}</td>
              {tempat.normalizedValues.map((value, i) => (
                <td key={i} className="border border-gray-200 p-2">{value.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MooraStepTable;
