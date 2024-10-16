// src/interface/tempatWisataProps.ts

export interface TempatWisata {
  id?: number;
  namaTempatWisata: string;
  koordinat: [string, string]; // Menggabungkan longitude dan latitude
  rating: number;
  harga: number;
  jenisWisata: string;
  deskripsi: string;
  [key: string]: any;
}
