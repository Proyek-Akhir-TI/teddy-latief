import { AppDataSource } from "../models/data-source";
import { Gambar } from "../models/entity/gambar";

export class GambarService {
  async createGambar(
    url: string,
    tempatWisataID: any
  ): Promise<Gambar> {
    const gambar = new Gambar();
    gambar.url = url;
    gambar.tempatWisata = {id: tempatWisataID} as any;
    const newGambar = await AppDataSource.manager.save(gambar);
    return newGambar;
  }

  async getGambar(): Promise<Gambar[]> {
    const gambar = await AppDataSource.manager.find(Gambar);
    return gambar;
  }

  async getGambarById(id: number): Promise<Gambar | null> {
    try {
      const gambar = await AppDataSource.manager.findOne(Gambar, {
        where: { id },
      });
      return gambar;
    } catch (error) {
      throw error;
    }
  }

  async getGambarByTempatWisataID(tempatWisataID: number): Promise<Gambar[]> {
    try {
      const gambar = await AppDataSource.manager.find(Gambar, {
        where: { tempatWisata: { id: tempatWisataID } },
        relations: ["tempatWisata"],
      });
      return gambar;
    } catch (error) {
      console.error("Error fetching Gambar by TempatWisataID: ", error);
      throw error;
    }
  }

  async updateGambar(id: number, updateData: Partial<Gambar>) {
    try {
      const gambar = await this.getGambarById(id);
      if (!gambar) {
        return undefined;
      }
      Object.assign(gambar, updateData);

      try {
        const updated = await AppDataSource.manager.save(gambar);
        console.log("Gambar updated : ", updated);
        return updated;
      } catch (updatederror) {
        console.log("Error updating gambar : ", updatederror);
        throw updatederror;
      }
    } catch (error) {
      console.error("Error updating gambar : ", error);
      throw error;
    }
  }

  async deleteGambar(id: number): Promise<boolean> {
    try {
      const gambar = await this.getGambarById(id);
      if (!gambar) {
        return false;
      }
      await AppDataSource.manager.remove(gambar);
      return true;
    } catch (error) {
      console.error("Error deleting gambar : ", error);
      throw error;
    }
  }
}