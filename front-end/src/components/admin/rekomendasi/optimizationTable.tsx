import React from 'react';
import { TempatWisata } from '@/src/interface/tempatWisataProps';

interface OptimizationTableProps {
  optimizedData: { tempatWisata: TempatWisata; benefitScore: number; costScore: number; netScore: number }[];
}

const OptimizationTable: React.FC<OptimizationTableProps> = ({ optimizedData }) => {
  return (
    <div className="optimization-table">
      <h2 className="text-lg font-bold mb-4">Optimasi</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama Tempat Wisata</th>
            <th className="border px-4 py-2">Benefit Score</th>
            <th className="border px-4 py-2">Cost Score</th>
            <th className="border px-4 py-2">Net Score</th>
          </tr>
        </thead>
        <tbody>
          {optimizedData.map((item) => (
            <tr key={item.tempatWisata.id}>
              <td className="border px-4 py-2">{item.tempatWisata.namaTempatWisata}</td>
              <td className="border px-4 py-2">{item.benefitScore.toFixed(4)}</td>
              <td className="border px-4 py-2">{item.costScore.toFixed(4)}</td>
              <td className="border px-4 py-2">{item.netScore.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptimizationTable;
