export interface Kriteria {
  id?: number;
  nama_kriteria: string;
  bobot_kriteria: number;
  Jenis_Kriteria: 'Benefit' | 'Cost';
  isBenefit: boolean; // Tambahkan properti ini

}
