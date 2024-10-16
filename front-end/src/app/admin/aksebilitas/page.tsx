"use client";
import { useState } from "react";
import { useAksebilitas } from "@/src/hooks/useAksebilitas";
import AksebilitasForm from "@/src/components/admin/aksebilitas/aksebilitasForm";
import AksebilitasList from "@/src/components/admin/aksebilitas/aksebilitasTable";
import { Aksebilitas } from "@/src/interface/aksebilitasProps";
import AdminLayout from "@/src/components/admin/layouts/adminLayouts";
import Breadcrumb from "@/src/components/admin/breadcrumbs/breadcrumbs";

const AksebilitasPage = () => {
  const {
    aksebilitasList,
    addOrEditAksebilitas,
    deleteAksebilitasById,
    loading,
    error,
  } = useAksebilitas();
  const [selectedAksebilitas, setSelectedAksebilitas] =
    useState<Aksebilitas | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleEdit = (aksebilitas: Aksebilitas) => {
    setSelectedAksebilitas(aksebilitas);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteAksebilitasById(id);
  };

  const handleSubmit = (aksebilitas: Aksebilitas) => {
    addOrEditAksebilitas(aksebilitas);
    setIsFormOpen(false);
    setSelectedAksebilitas(null);
  };

  const handleNewForm = () => {
    setSelectedAksebilitas(null);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout>
      <Breadcrumb pageName="Aksebilitas" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Aksebilitas</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleNewForm}
          className="mb-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Aksebilitas
        </button>
        {isFormOpen && (
          <AksebilitasForm
            onSubmit={handleSubmit}
            initialData={selectedAksebilitas || undefined}
            onClose={() => setIsFormOpen(false)}
          />
        )}
        <AksebilitasList
          aksebilitasList={aksebilitasList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default AksebilitasPage;
