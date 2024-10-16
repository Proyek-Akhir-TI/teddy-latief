// src/hooks/useTempatWisata.ts
import { useState, useEffect } from "react";
import { TempatWisata } from "../interface/tempatWisataProps";
import { fetchTempatWisata, createTempatWisata, updateTempatWisata, deleteTempatWisata } from "../api/tempatWisataApi";

export const useTempatWisata = () => {
  const [tempatWisataList, setTempatWisataList] = useState<TempatWisata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchTempatWisata();
        setTempatWisataList(data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const addOrEditTempatWisata = async (tempatWisata: TempatWisata) => {
    setLoading(true);
    try { 
      if (tempatWisata.id) {
        const updatedTempatWisata = await updateTempatWisata(tempatWisata);
        setTempatWisataList(tempatWisataList.map(t => t.id === tempatWisata.id ? updatedTempatWisata : t));
      } else {
        const newTempatWisata = await createTempatWisata(tempatWisata);
        setTempatWisataList([...tempatWisataList, newTempatWisata]);
      }
    } catch (err) {
      setError("Error updating or creating tempat wisata");
    } finally {
      setLoading(false);
    }
  };

  const deleteTempatWisataById = async (id: number) => {
    setLoading(true);
    try {
      await deleteTempatWisata(id);
      setTempatWisataList(tempatWisataList.filter(t => t.id !== id));
    } catch (err) {
      setError("Error deleting tempat wisata");
    } finally {
      setLoading(false);
    }
  };

  return { tempatWisataList, addOrEditTempatWisata, deleteTempatWisataById, loading, error };
}
