import { Gambar } from "../interface/gambarProps";

export const fetchGambar = async (): Promise<Gambar[]> => {
  const response = await fetch('http://localhost:3300/documentation');
  const data = await response.json();
  return data;
};

export const createGambar = async (gambar : Gambar) => {
  const response = await fetch('http://localhost:3300/documentation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gambar)
  })
  const data = await response.json();
  return data
}

export const fetchGambarByTempatWisataId = async (id: number): Promise<Gambar[]> => {
  const response = await fetch(`http://localhost:3300/documentation/tempat-wisata/${id}`);
  const data = await response.json();
  return data;
} 

export const deleteGambar = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3300/documentation/${id}`, {
    method: 'DELETE',
  });
}