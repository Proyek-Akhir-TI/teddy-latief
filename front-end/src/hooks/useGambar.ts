import { useState, useEffect, useCallback } from "react";
import { Gambar } from "../interface/gambarProps";
import {
  fetchGambar,
  createGambar,
  updateGambar,
  deleteGambar,
} from "../api/gambarApi";

export const useGambar = () => {
  const [gambarList, setGambarList] = useState<Gambar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getGambarList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGambar();
      setGambarList(data);
    } catch (err) {
      setError("Failed to fetch gambar");
    } finally {
      setLoading(false);
    }
  }, []);

  const addGambar = useCallback(async (gambar: Gambar) => {
    setLoading(true);
    setError(null);
    try {
      const newGambar = await createGambar(gambar);
      setGambarList((prevList) => [...prevList, newGambar]);
    } catch (err) {
      setError("Failed to add gambar");
    } finally {
      setLoading(false);
    }
  }, []);

  const editGambar = useCallback(async (gambar: Gambar) => {
    setLoading(true);
    setError(null);
    try {
      const updatedGambar = await updateGambar(gambar);
      setGambarList((prevList) =>
        prevList.map((item) => (item.id === updatedGambar.id ? updatedGambar : item))
      );
    } catch (err) {
      setError("Failed to update gambar");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeGambar = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteGambar(id);
      setGambarList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete gambar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGambarList();
  }, [getGambarList]);

  return {
    gambarList,
    loading,
    error,
    addGambar,
    editGambar,
    removeGambar,
  };
};
