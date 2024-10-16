import React from 'react';
import AdminLayout from '../../components/admin/layouts/adminLayouts';
import { FaMapMarkerAlt, FaListUl, FaChartLine, FaTrophy } from 'react-icons/fa';

// Tipe data untuk dashboard
interface DashboardData {
  totalDestinations: number;
  totalCriteria: number;
  latestRecommendations: number;
  topRecommendation: string;
}

// Tipe data untuk rekomendasi
interface Recommendation {
  id: number;
  name: string;
  mooraScore: number;
}

// Fungsi untuk menghasilkan data dummy
const getDummyDashboardData = (): DashboardData => {
  return {
    totalDestinations: 17,
    totalCriteria: 4,
    latestRecommendations: 5,
    topRecommendation: 'Grand Watu Dodol'
  };
};

const getDummyRecommendations = (): Recommendation[] => {
  return [
    { id: 1, name: 'Grand Watu Dodol', mooraScore: 0.29 },
    { id: 2, name: 'De Djawatan Forest', mooraScore: 0.25 },
    { id: 3, name: 'Pantai Mustika Pancer', mooraScore: 0.24 },
    { id: 4, name: 'Pantai Pulau Merah', mooraScore: 0.21 },
    { id: 5, name: 'Pinus Camp Songgon', mooraScore: 0.18 },
  ];
};

const AdminPage: React.FC = () => {
  const dashboardData = getDummyDashboardData();
  const recommendations = getDummyRecommendations();

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard Rekomendasi Tempat Wisata</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            icon={<FaMapMarkerAlt className="text-blue-500" />}
            title="Total Tempat Wisata"
            value={dashboardData.totalDestinations}
          />
          <DashboardCard
            icon={<FaListUl className="text-green-500" />}
            title="Total Kriteria"
            value={dashboardData.totalCriteria}
          />
          <DashboardCard
            icon={<FaChartLine className="text-purple-500" />}
            title="Rekomendasi Terbaru"
            value={dashboardData.latestRecommendations}
          />
          <DashboardCard
            icon={<FaTrophy className="text-yellow-500" />}
            title="Rekomendasi Teratas"
            value={dashboardData.topRecommendation}
          />
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Rekomendasi Aktif</h2>
          </div>
          <div className="p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Tempat Wisata</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor MOORA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendations.map((rec, index) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rec.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rec.mooraScore.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
    <div className="flex-shrink-0">
      <div className="bg-gray-100 rounded-full p-3">
        {icon}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default AdminPage;