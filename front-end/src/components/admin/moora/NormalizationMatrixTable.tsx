import React, { useEffect, useState, useMemo } from 'react';
import RankingTable from './FinalScoreTable'; // Import the new RankingTable component

interface FinalScore {
  tempatWisata: string;
  finalScore: number;
}

interface NormalizationMatrixRow {
  tempatWisata: string;
  aksebilitas: number;
  rating: number;
  harga: number;
  jarak: number;
}

interface NormalizationMatrixProps {
  matrix: NormalizationMatrixRow[];
}

const NormalizationMatrixTable: React.FC<NormalizationMatrixProps> = ({ matrix }) => {
  const normalizedMatrix = useMemo(() => {
    if (matrix.length === 0) return [];

    const aksebilitasNorm = Math.sqrt(matrix.reduce((sum, item) => sum + item.aksebilitas ** 2, 0));
    const ratingNorm = Math.sqrt(matrix.reduce((sum, item) => sum + item.rating ** 2, 0));
    const hargaNorm = Math.sqrt(matrix.reduce((sum, item) => sum + item.harga ** 2, 0));
    const jarakNorm = Math.sqrt(matrix.reduce((sum, item) => sum + item.jarak ** 2, 0));

    return matrix.map((row) => ({
      tempatWisata: row.tempatWisata,
      aksebilitas: row.aksebilitas / aksebilitasNorm,
      rating: row.rating / ratingNorm,
      harga: row.harga / hargaNorm,
      jarak: row.jarak / jarakNorm,
    }));
  }, [matrix]);

  const optimizationScores = useMemo(() => {
    return normalizedMatrix.map((row) => {
      const score = (row.aksebilitas + row.rating) - (row.harga + row.jarak); // Asumsi: aksebilitas dan rating adalah kriteria positif, harga dan jarak adalah kriteria negatif
      return {
        tempatWisata: row.tempatWisata,
        optimizationScore: score,
      };
    });
  }, [normalizedMatrix]);

  const finalScores = useMemo(() => {
    return optimizationScores
      .map(score => ({
        tempatWisata: score.tempatWisata,
        finalScore: score.optimizationScore,
      }))
      .sort((a, b) => b.finalScore - a.finalScore); // Sort descending by finalScore
  }, [optimizationScores]);

  return (
    <div>
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Matriks Normalisasi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-center">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Wisata</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Aksebilitas</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Jarak</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {normalizedMatrix.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.tempatWisata}</td>
                  <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.aksebilitas.toFixed(2)}</td>
                  <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.rating.toFixed(2)}</td>
                  <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.harga.toFixed(2)}</td>
                  <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.jarak.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Skor Optimasi MOORA</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-center">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Wisata</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Optimasi</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {optimizationScores.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.tempatWisata}</td>
                  <td className="px-6 py-3 text-sm text-center font-medium text-gray-500 uppercase tracking-wider">{row.optimizationScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use the new RankingTable component here */}
      <RankingTable finalScores={finalScores} />
    </div>
  );
};

export default NormalizationMatrixTable;
