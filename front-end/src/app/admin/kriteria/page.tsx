"use client";

import { useState } from "react";
import KriteriaTable from "@/src/components/admin/kriteria/kriteriaTable";
import KriteriaForm from "@/src/components/admin/kriteria/kriteriaForm";
import { useKriteria } from "../../../hooks/useKriteria";
import { Kriteria } from "../../../interface/kriteriaProps";
import Modal from "@/src/components/admin/kriteria/modal";
import AdminLayout from "@/src/components/admin/layouts/adminLayouts";
import Breadcrumb from "@/src/components/admin/breadcrumbs/breadcrumbs";

const KriteriaPage = () => {
  const {
    kriteriaList,
    addOrEditKriteria,
    deleteKriteriaById,
    loading,
    error,
  } = useKriteria();
  const [showForm, setShowForm] = useState(false);
  const [editingKriteria, setEditingKriteria] = useState<Kriteria | null>(null);

  const handleAddOrEdit = async (kriteria: Kriteria) => {
    await addOrEditKriteria(kriteria);
    setEditingKriteria(null);
    setShowForm(false);
  };

  const handleEdit = (kriteria: Kriteria) => {
    setEditingKriteria(kriteria);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteKriteriaById(id);
  };

  const openForm = () => {
    setEditingKriteria(null);
    setShowForm(true);
    console.log("Opening form...");
  };

  console.log("showForm state:", showForm);

  return (
    <AdminLayout>
      <Breadcrumb pageName="Kriteria" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Kriteria</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={openForm}
          className="mb-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Kriteria
        </button>
        <KriteriaTable
          kriteriaList={kriteriaList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <KriteriaForm
              onSubmit={handleAddOrEdit}
              initialData={editingKriteria || undefined}
            />
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default KriteriaPage;
