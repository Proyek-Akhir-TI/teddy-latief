// src/api/tempatWisataApi.ts
import { TempatWisata } from '../interface/tempatWisataProps';

export const fetchTempatWisata = async (): Promise<TempatWisata[]> => {
  const response = await fetch('http://localhost:3300/tmp-wisata');
  const data = await response.json();
  return data.map((item: any) => ({
    ...item,
    koordinat: [item.longitude, item.latitude],
  }));
};

export const fetchTempatWisataById = async (id: number): Promise<TempatWisata> => {
  const response = await fetch(`http://localhost:3300/tmp-wisata/${id}`);
  const data = await response.json();
  return {
    ...data,
    koordinat: [data.longitude, data.latitude],
  };
};

export const createTempatWisata = async (tempatWisata: TempatWisata): Promise<TempatWisata> => {
  const { koordinat, ...rest } = tempatWisata;
  const [longitude, latitude] = koordinat;
  const response = await fetch('http://localhost:3300/tmp-wisata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...rest, longitude, latitude }),
  });
  const data = await response.json();
  return {
    ...data,
    koordinat: [data.longitude, data.latitude],
  };
};

export const updateTempatWisata = async (tempatWisata: TempatWisata): Promise<TempatWisata> => {
  const { koordinat, ...rest } = tempatWisata;
  const [longitude, latitude] = koordinat;
  const response = await fetch(`http://localhost:3300/tmp-wisata/${tempatWisata.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...rest, longitude, latitude }),
  });
  const data = await response.json();
  return {
    ...data,
    koordinat: [data.longitude, data.latitude],
  };
};

export const deleteTempatWisata = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:3300/tmp-wisata/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return {
    ...data,
    koordinat: [data.longitude, data.latitude],
  };
};
