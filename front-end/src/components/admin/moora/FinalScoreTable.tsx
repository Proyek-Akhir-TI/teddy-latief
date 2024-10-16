"use client"
import React from 'react';

interface FinalScore {
  tempatWisata: string;
  finalScore: number;
}

interface RankingTableProps {
  finalScores: FinalScore[];
}

const RankingTable: React.FC<RankingTableProps> = ({ finalScores }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hasil Akhir dan Perankingan MOORA</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-center">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Wisata</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Akhir</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {finalScores.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.tempatWisata}</td>
                <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.finalScore.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
