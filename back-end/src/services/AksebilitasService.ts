import { AppDataSource } from "../models/data-source";
import { Aksebilitas } from "../models/entity/aksebilitas";
import { TempatWisata } from "../models/entity/tempat_wisata";

export class AksebilitasService {
  async createAksebilitas(
    ramp: boolean,
    toiletKhusus: boolean,
    parkirKhususDifabel: boolean,
    jalanKhususDifabel: boolean,
    tempatWisataID: any
  ): Promise<Aksebilitas> {
    const aksebilitas = new Aksebilitas();
    aksebilitas.ramp = ramp;
    aksebilitas.toiletKhusus = toiletKhusus;
    aksebilitas.parkirKhususDifabel = parkirKhususDifabel;
    aksebilitas.jalanKhususDifabel = jalanKhususDifabel;
    aksebilitas.tempatWisata = {id: tempatWisataID} as any;
    const newAksebilitas = await AppDataSource.manager.save(aksebilitas);
    return newAksebilitas;
  }

  async getAksebilitas(): Promise<Aksebilitas[]> {
    const aksebilitas = await AppDataSource.manager.find(Aksebilitas);
    return aksebilitas;
  }

  async getAksebilitasById(id: number): Promise<Aksebilitas | null> {
    try {
      const aksebilitas = await AppDataSource.manager.findOne(Aksebilitas, {
        where: { id },
      });
      return aksebilitas;
    } catch (error) {
      throw error;
    }
  }

  async updateAksebilitas(id: number, updateData: Partial<Aksebilitas>) {
    try {
      const aksebilitas = await this.getAksebilitasById(id);
      if (!aksebilitas) {
        return undefined;
      }
      Object.assign(aksebilitas, updateData);

      try {
        const updated = await AppDataSource.manager.save(aksebilitas);
        console.log("Aksebilitas updated : ", updated);
        return updated;
      } catch (updatederror) {
        console.log("Error updating aksebilitas : ", updatederror);
        throw updatederror;
      }
    } catch (error) {
      console.error("Error updating aksebilitas : ", error);
      throw error;
    }
  }

  async deleteAksebilitas(id: number): Promise<boolean> {
    try {
      const deleted = await this.getAksebilitasById(id);
      if (!deleted) {
        return false;
      }
      await AppDataSource.manager.delete(Aksebilitas, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAksebilitasWithTempatWisata(): Promise<any[]> {
    const aksebilitas = await AppDataSource.manager.find(Aksebilitas, {
      relations: ["tempatWisata"],
    });
    return aksebilitas;
  }

  async countAksebilitasPerTempatWisata(): Promise<any[]> {
    const aksebilitasData = await AppDataSource.getRepository(Aksebilitas)
      .createQueryBuilder("aksebilitas")
      .select("aksebilitas.tempatWisataId", "tempatWisataId")
      .addSelect("COUNT(CASE WHEN aksebilitas.ramp THEN 1 END)", "rampCount")
      .addSelect("COUNT(CASE WHEN aksebilitas.toiletKhusus THEN 1 END)", "toiletKhususCount")
      .addSelect("COUNT(CASE WHEN aksebilitas.parkirKhususDifabel THEN 1 END)", "parkirKhususDifabelCount")
      .addSelect("COUNT(CASE WHEN aksebilitas.jalanKhususDifabel THEN 1 END)", "jalanKhususDifabelCount")
      .addSelect(
        "COUNT(CASE WHEN aksebilitas.ramp THEN 1 END) + " +
        "COUNT(CASE WHEN aksebilitas.toiletKhusus THEN 1 END) + " +
        "COUNT(CASE WHEN aksebilitas.parkirKhususDifabel THEN 1 END) + " +
        "COUNT(CASE WHEN aksebilitas.jalanKhususDifabel THEN 1 END)",
        "totalAksebilitasCount"
      )
      .groupBy("aksebilitas.tempatWisataId")
      .getRawMany();

    const result = await Promise.all(aksebilitasData.map(async (data) => {
      const tempatWisata = await AppDataSource.manager.findOne(TempatWisata, {
        where: { id: data.tempatWisataId },
      });
      return {
        tempatWisata,
        rampCount: Number(data.rampCount),
        toiletKhususCount: Number(data.toiletKhususCount),
        parkirKhususDifabelCount: Number(data.parkirKhususDifabelCount),
        jalanKhususDifabelCount: Number(data.jalanKhususDifabelCount),
        totalAksebilitasCount: Number(data.totalAksebilitasCount),
      };
    }));

    return result;
  }
}