import { useEffect, useState } from "react";
import { Kriteria } from "../interface/kriteriaProps";
import { fetchKriteria, createKriteria, updateKriteria, deleteKriteria } from "../api/kriteriaApi";

export const useKriteria = () => {
  const [kriteriaList, setKriteriaList] = useState<Kriteria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchKriteria();
        setKriteriaList(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const addOrEditKriteria = async (kriteria: Kriteria) => {
    setLoading(true);
    try {
      if (kriteria.id) {
        const updatedKriteria = await updateKriteria(kriteria);
        setKriteriaList(kriteriaList.map(k => k.id === kriteria.id ? updatedKriteria : k));
      } else {
        const newKriteria = await createKriteria(kriteria);
        setKriteriaList([...kriteriaList, newKriteria]);
      }
    } catch (err) {
      setError("Error updating or creating kriteria");
    } finally {
      setLoading(false);
    }
  };

  const deleteKriteriaById = async (id: number) => {
    setLoading(true);
    try {
      await deleteKriteria(id);
      setKriteriaList(kriteriaList.filter(k => k.id !== id));
    } catch (err) {
      setError("Error deleting kriteria");
    } finally {
      setLoading(false);
    }
  };

  return { kriteriaList, addOrEditKriteria, deleteKriteriaById, loading, error };
};
