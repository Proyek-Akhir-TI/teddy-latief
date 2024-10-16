import { AppDataSource } from "../models/data-source";
import { TempatWisata } from "../models/entity/tempat_wisata";

export class TempatWisataService {
  async createTempatWisata(
    namaTempatWisata: string,
    longitude: string,
    latitude: string,
    rating: number,
    harga: number,
    jenisWisata: string,
    deskripsi: string
  ): Promise<TempatWisata> {
    const tempatWisata = new TempatWisata();
    tempatWisata.namaTempatWisata = namaTempatWisata;
    tempatWisata.longitude = longitude;
    tempatWisata.latitude = latitude;
    tempatWisata.rating = rating;
    tempatWisata.harga = harga;
    tempatWisata.jenisWisata = jenisWisata;
    tempatWisata.deskripsi = deskripsi;
    const newTempatWisata = await AppDataSource.manager.save(tempatWisata);
    return newTempatWisata;
  }

  async getTempatWisata(): Promise<TempatWisata[]> {
    const tempatWisata = await AppDataSource.manager.find(TempatWisata);
    return tempatWisata;
  }

  async getTempatWisataById(id: number): Promise<TempatWisata | null> {
    try {
      const tempatWisata = await AppDataSource.manager.findOne(TempatWisata, {
        where: { id },
      });
      return tempatWisata;
    } catch(error) {
      throw error;
    }
  }

  async updateTempatWisata(id: number, updateData: Partial<TempatWisata>) {
    try {
      const tempatWisata = await this.getTempatWisataById(id);
      if (!tempatWisata) {
        return undefined;
      }

      Object.assign(tempatWisata, updateData);

      try {
        const updated = await AppDataSource.manager.save(tempatWisata);
        console.log("Tempat wisata updated : ", updated);
        return updated;
      } catch (updatederror) {
        console.log("Error updating tempat wisata : ", updatederror);
        throw updatederror;
      }
    } catch (error) {
      console.error("Error updating tempat wisata : ", error);
      throw error;
    }
  }

  async deleteTempatWisata(id: number): Promise<boolean> {
    try {
      const deleted = await this.getTempatWisataById(id);
      if (!deleted) {
        return false;
      }
      await AppDataSource.manager.remove(TempatWisata, deleted);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
