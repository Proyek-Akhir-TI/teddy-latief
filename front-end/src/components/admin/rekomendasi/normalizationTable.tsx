import React from 'react';
import { TempatWisata } from '@/src/interface/tempatWisataProps';
import { Kriteria } from '@/src/interface/kriteriaProps';

interface NormalizationTableProps {
  normalizedData: { tempatWisata: TempatWisata; normalizedValues: number[] }[];
  kriteria: Kriteria[];
}

const NormalizationTable: React.FC<NormalizationTableProps> = ({ normalizedData, kriteria }) => {
  return (
    <div className="normalization-table">
      <h2 className="text-lg font-bold mb-4">Normalisasi</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama Tempat Wisata</th>
            {kriteria.map((k) => (
              <th key={k.id} className="border px-4 py-2">{k.nama_kriteria}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedData.map((item) => (
            <tr key={item.tempatWisata.id}>
              <td className="border px-4 py-2">{item.tempatWisata.namaTempatWisata}</td>
              {item.normalizedValues.map((value, index) => (
                <td key={index} className="border px-4 py-2">{value.toFixed(4)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NormalizationTable;
