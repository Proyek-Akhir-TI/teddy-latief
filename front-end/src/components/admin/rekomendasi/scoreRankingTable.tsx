import React from 'react';
import { TempatWisata } from '@/src/interface/tempatWisataProps';

interface ScoringRankingTableProps {
  scoringData: { tempatWisata: TempatWisata; score: number; rank: number }[];
}

const ScoringRankingTable: React.FC<ScoringRankingTableProps> = ({ scoringData }) => {
  return (
    <div className="scoring-ranking-table">
      <h2 className="text-lg font-bold mb-4">Scoring dan Ranking</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama Tempat Wisata</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Rank</th>
          </tr>
        </thead>
        <tbody>
          {scoringData.map((item, index) => (
            <tr key={item.tempatWisata.id}>
              <td className="border px-4 py-2">{item.tempatWisata.namaTempatWisata}</td>
              <td className="border px-4 py-2">{item.score.toFixed(4)}</td>
              <td className="border px-4 py-2">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoringRankingTable;
