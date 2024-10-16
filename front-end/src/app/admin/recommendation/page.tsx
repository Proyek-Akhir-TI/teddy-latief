"use client";

import React, { useEffect, useState } from "react";
import { fetchTempatWisata } from "@/src/api/tempatWisataApi";
import { fetchKriteria } from "@/src/api/kriteriaApi";
import { fetchAksebilitas } from "@/src/api/aksebilitasApi";
import { TempatWisata } from "@/src/interface/tempatWisataProps";
import { Kriteria } from "@/src/interface/kriteriaProps";
import { Aksebilitas } from "@/src/interface/aksebilitasProps";

import DecisionMatrixTable from "@/src/components/admin/moora/DecisionMatrixTable";
import NormalizationMatrixTable from "@/src/components/admin/moora/NormalizationMatrixTable";

import AdminLayout from "@/src/components/admin/layouts/adminLayouts";
import Breadcrumb from "@/src/components/admin/breadcrumbs/breadcrumbs";

interface FinalScore {
  tempatWisata: string;
  finalScore: number;
}

const RekomendasiPage: React.FC = () => {
  const [tempatWisata, setTempatWisata] = useState<TempatWisata[]>([]);
  const [kriteria, setKriteria] = useState<Kriteria[]>([]);
  const [aksebilitas, setAksebilitas] = useState<Aksebilitas[]>([]);
  const [loading, setLoading] = useState(true);
  const [decisionMatrix, setDecisionMatrix] = useState<any[]>([]); // Store the decision matrix here

  // Mengambil data tempat wisata, kriteria, dan aksebilitas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTempatWisata = await fetchTempatWisata();
        const fetchedKriteria = await fetchKriteria();
        const fetchedAksebilitas = await fetchAksebilitas();
        
        setTempatWisata(fetchedTempatWisata);
        setKriteria(fetchedKriteria);
        setAksebilitas(fetchedAksebilitas);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state saat fetching data
  if (loading) {
    return (
      <AdminLayout>
        <Breadcrumb pageName="Rekomendasi" />
        <div className="p-6 bg-white">
          <h1 className="text-2xl text-center font-bold mb-4">Rekomendasi Tempat Wisata</h1>
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Breadcrumb pageName="Rekomendasi" />
      <div className="p-6 bg-white">
        <h1 className="text-2xl text-center font-bold mb-4">Rekomendasi Tempat Wisata</h1>
        
        {/* Render Matriks Keputusan */}
        <DecisionMatrixTable
          setDecisionMatrix={setDecisionMatrix}
        />

        {/* Normalization Matrix Table */}
        <NormalizationMatrixTable
          matrix={decisionMatrix}
        />
      </div>
    </AdminLayout>
  );
};

export default RekomendasiPage;
