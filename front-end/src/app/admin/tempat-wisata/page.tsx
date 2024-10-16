"use client";

import { useState } from "react";
import TempatWisataTable from "@/src/components/admin/tempat-wisata/tempatWisataTable";
import TempatWisataForm from "@/src/components/admin/tempat-wisata/tempatWisataForm";
import { useTempatWisata } from "@/src/hooks/useTmpWisata";
import { TempatWisata } from "@/src/interface/tempatWisataProps";
import Modal from "@/src/components/admin/tempat-wisata/modalTempatWisata";
import AdminLayout from "@/src/components/admin/layouts/adminLayouts";
import Breadcrumb from "@/src/components/admin/breadcrumbs/breadcrumbs";
import TambahGambarOverlay from "@/src/components/admin/gambar/tambahGambarOverlay";
import LihatGambarOverlay from "@/src/components/admin/gambar/lihatGambarOverlay";

const TempatWisataPage = () => {
  const {
    tempatWisataList,
    addOrEditTempatWisata,
    deleteTempatWisataById,
    loading,
    error,
  } = useTempatWisata();

  const [showForm, setShowForm] = useState(false);
  const [showTambahGambarOverlay, setShowTambahGambarOverlay] = useState(false);
  const [showLihatGambarOverlay, setShowLihatGambarOverlay] = useState(false);
  const [editingTempatWisata, setEditingTempatWisata] = useState<TempatWisata | null>(null);
  const [selectedTempatWisataId, setSelectedTempatWisataId] = useState<number | null>(null);

  const handleAddOrEdit = async (tempatWisata: TempatWisata) => {
    await addOrEditTempatWisata(tempatWisata);
    setEditingTempatWisata(null);
    setShowForm(false);
  };

  const handleEdit = (tempatWisata: TempatWisata) => {
    setEditingTempatWisata(tempatWisata);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteTempatWisataById(id);
  };

  const openForm = () => {
    setEditingTempatWisata(null);
    setShowForm(true);
  };

  const openTambahGambarOverlay = (tempatWisataId: number) => {
    setSelectedTempatWisataId(tempatWisataId);
    setShowTambahGambarOverlay(true);
  };

  const openLihatGambarOverlay = (tempatWisataId: number) => {
    setSelectedTempatWisataId(tempatWisataId);
    setShowLihatGambarOverlay(true);
  };

  return (
    <AdminLayout>
      <Breadcrumb pageName="Tempat Wisata" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Tempat Wisata</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={openForm}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Tempat Wisata
          </button>
        </div>
        <TempatWisataTable
          tempatWisataList={tempatWisataList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTambahGambar={openTambahGambarOverlay}
          onLihatGambar={openLihatGambarOverlay}
        />
        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <TempatWisataForm
              onSubmit={handleAddOrEdit}
              initialData={editingTempatWisata || undefined}
            />
          </Modal>
        )}
        {showTambahGambarOverlay && selectedTempatWisataId && (
          <TambahGambarOverlay 
            tempatWisataId={selectedTempatWisataId}
            onClose={() => setShowTambahGambarOverlay(false)}
          />
        )}
        {showLihatGambarOverlay && selectedTempatWisataId && (
          <LihatGambarOverlay 
            tempatWisataId={selectedTempatWisataId}
            onClose={() => setShowLihatGambarOverlay(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default TempatWisataPage;
