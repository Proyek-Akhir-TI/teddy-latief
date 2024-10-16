import { AppDataSource } from "../models/data-source";
import { Kriteria, StatusKriteria } from "../models/entity/kriteria";

export class KriteriaService {
  async createKriteria(
    nama_kriteria: string,
    bobot_kriteria: number,
    Jenis_Kriteria: StatusKriteria
  ): Promise<Kriteria> {
    const kriteria = new Kriteria();
    kriteria.nama_kriteria = nama_kriteria;
    kriteria.bobot_kriteria = bobot_kriteria;
    kriteria.Jenis_Kriteria = Jenis_Kriteria;
    const newKriteria = await AppDataSource.manager.save(kriteria);
    return newKriteria;
  }

  async getKriteria(): Promise<Kriteria[]> {
    const kriteria = await AppDataSource.manager.find(Kriteria);
    return kriteria;
  }

  async getKriteriaById(id: number): Promise<Kriteria | null> {
    try {
      const kriteria = await AppDataSource.manager.findOne(Kriteria, {
        where: { id }
      })
      return kriteria
    } catch (error) {
      throw error
    }
  }

  async updateKriteria(id:number, updateData: Partial<Kriteria>){
    try {
      const kriteria = await this.getKriteriaById(id)
      if(!kriteria){
        return undefined
      }

      Object.assign(kriteria, updateData)

      try {
        const updated = await AppDataSource.manager.save(kriteria)
        console.log("Kriteria updated : ", updated)
        return updated
      } catch (updatederror) {
        console.log("Error updating kriteria : ", updatederror)
        throw updatederror
      }
    } catch (error) {
      console.error("Error updating kriteria : ", error)
      throw error
    }
  }

  async deleteKriteria(id: number): Promise<boolean> {
    try {
      const deleted = await this.getKriteriaById(id)
      if(!deleted){
        return false
      }
      await AppDataSource.manager.remove(Kriteria,deleted)
      return true
    } catch (error) {
      throw error
    }
  }
}
