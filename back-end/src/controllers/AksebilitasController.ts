import { AksebilitasService } from "../services/AksebilitasService";
import { Request, Response } from "express";

const aksebilitas_service = new AksebilitasService();

class AksebilitasController {
  createAksebilitas = async (req: Request, res: Response) => {
    try {
      const {
        ramp,
        toiletKhusus,
        parkirKhususDifabel,
        jalanKhususDifabel,
        tempatWisataID,
      } = req.body;
      const newAksebilitas = await aksebilitas_service.createAksebilitas(
        ramp,
        toiletKhusus,
        parkirKhususDifabel,
        jalanKhususDifabel,
        tempatWisataID
      );
      res.status(201).json(newAksebilitas);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getAksebilitas = async (req: Request, res: Response) => {
    try {
      const aksebilitas = await aksebilitas_service.getAksebilitas();
      const aksebilitasWithTempatWisata = aksebilitas.map((item) => ({
        ...item,
        tempatWisata: item.tempatWisata,
      }));
      res.status(200).json(aksebilitasWithTempatWisata);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getAksebilitasWithTempatWisata = async (req: Request, res: Response) => {
    try {
      const aksebilitas = await aksebilitas_service.getAksebilitasWithTempatWisata();
      res.status(200).json(aksebilitas);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getAksebilitasById = async (req: Request, res: Response) => {
    const aksebilitasId = parseInt(req.params.id);
    if (isNaN(aksebilitasId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const aksebilitas = await aksebilitas_service.getAksebilitasById(aksebilitasId);
      console.log("aksebilitas : ", aksebilitas);
      if (!aksebilitas) {
        return res.status(404).json({ message: "Aksebilitas not found" });
      }
      res.status(200).json(aksebilitas);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  updateAksebilitas = async (req: Request, res: Response) => {
    const aksebilitasId = parseInt(req.params.id);
    if (isNaN(aksebilitasId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updated = req.body;

    try {
      const aksebilitasUpdated = await aksebilitas_service.updateAksebilitas(aksebilitasId, updated);
      if (!aksebilitasUpdated) {
        return res.status(404).json({ message: "Aksebilitas not found" });
      }
      res.status(200).json("Aksebilitas updated");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteAksebilitas = async (req: Request, res: Response) => {
    const aksebilitasId = parseInt(req.params.id);
    if (isNaN(aksebilitasId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const deleted = await aksebilitas_service.deleteAksebilitas(aksebilitasId);
      if (!deleted) {
        return res.status(404).json({ message: "Aksebilitas not found" });
      }
      res.status(200).json("Aksebilitas deleted");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // New method to count Aksebilitas per Tempat Wisata
  countAksebilitasPerTempatWisata = async (req: Request, res: Response) => {
    try {
      const aksebilitasCounts = await aksebilitas_service.countAksebilitasPerTempatWisata();
      res.status(200).json(aksebilitasCounts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new AksebilitasController();
