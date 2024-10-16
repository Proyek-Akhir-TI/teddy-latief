import { Aksebilitas } from "../interface/aksebilitasProps";

export const fetchAksebilitas = async (): Promise<Aksebilitas[]> => {
  const response = await fetch('http://localhost:3300/aksebilitas');
  const data = await response.json();
  return data;
}

export const fetchAksebilitasById = async (id: number): Promise<Aksebilitas> => {
  const response = await fetch(`http://localhost:3300/aksebilitas/${id}`);
  const data = await response.json();
  return data;
}

export const createAksebilitas = async (aksebilitas: Aksebilitas): Promise<Aksebilitas> => {
  const response = await fetch('http://localhost:3300/aksebilitas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aksebilitas),
  });
  const data = await response.json();
  return data;
}

export const updateAksebilitas = async (aksebilitas: Aksebilitas): Promise<Aksebilitas> => {
  const response = await fetch(`http://localhost:3300/aksebilitas/${aksebilitas.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(aksebilitas),
  });
  const data = await response.json();
  return data;
}

export const deleteAksebilitas = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3300/aksebilitas/${id}`, {
    method: 'DELETE',
  });
}

export const fetchAksebilitasByTempatWisata = async (): Promise<Aksebilitas[]> => {
  const response = await fetch(`http://localhost:3300/aksebilitas-with-tempat-wisata`);
  const data = await response.json();
  return data;
}

export const getAksebilitasCount = async (id: number): Promise<number> => {
  const response = await fetch(`http://localhost:3300/count-aksebilitas`);
  const data = await response.json();
  return data.count;
}