import { useEffect, useState } from "react";
import { Aksebilitas } from "../interface/aksebilitasProps";
import { fetchAksebilitas, createAksebilitas, updateAksebilitas, deleteAksebilitas } from "../api/aksebilitasApi";

export const useAksebilitas = () => {
  const [aksebilitasList, setAksebilitasList] = useState<Aksebilitas[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchAksebilitas();
        setAksebilitasList(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const addOrEditAksebilitas = async (aksebilitas: Aksebilitas) => {
    setLoading(true);
    try {
      if (aksebilitas.id) {
        const updatedAksebilitas = await updateAksebilitas(aksebilitas);
        setAksebilitasList(aksebilitasList.map(k => k.id === aksebilitas.id ? updatedAksebilitas : k));
      } else {
        const newAksebilitas = await createAksebilitas(aksebilitas);
        setAksebilitasList([...aksebilitasList, newAksebilitas]);
      }
    } catch (err) {
      setError("Error updating or creating aksebilitas");
    } finally {
      setLoading(false);
    }
  };

  const deleteAksebilitasById = async (id: number) => {
    setLoading(true);
    try {
      await deleteAksebilitas(id);
      setAksebilitasList(aksebilitasList.filter(k => k.id !== id));
    } catch (err) {
      setError("Error deleting aksebilitas");
    } finally {
      setLoading(false);  
    }
  };

  return { aksebilitasList, addOrEditAksebilitas, deleteAksebilitasById, loading, error };
}