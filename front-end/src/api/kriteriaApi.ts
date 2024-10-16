import { Kriteria } from '../interface/kriteriaProps';

export const fetchKriteria = async (): Promise<Kriteria[]> => {
  const response = await fetch('http://localhost:3300/kriteria');
  const data = await response.json();
  return data;
};

export const fetchKriteriaById = async (id: number): Promise<Kriteria> => {
  const response = await fetch(`http://localhost:3300/kriteria/${id}`);
  const data = await response.json();
  return data;
};

export const createKriteria = async (kriteria: Kriteria): Promise<Kriteria> => {
  const response = await fetch('http://localhost:3300/kriteria', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(kriteria),
  });
  const data = await response.json();
  return data;
};

export const updateKriteria = async (kriteria: Kriteria): Promise<Kriteria> => {
  const response = await fetch(`http://localhost:3300/kriteria/${kriteria.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(kriteria),
  });
  const data = await response.json();
  return data;
};

export const deleteKriteria = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3300/kriteria/${id}`, {
    method: 'DELETE',
  });
};
