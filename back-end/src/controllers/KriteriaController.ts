import { KriteriaService } from "../services/KriteriaService";
import { Request, Response } from "express";

const kriteria_service = new KriteriaService();

class KriteriaController {
  createKriteria = async (req: Request, res: Response) => {
    try {
      const { nama_kriteria, bobot_kriteria, Jenis_Kriteria } = req.body;
      const newKriteria = await kriteria_service.createKriteria(
        nama_kriteria,
        bobot_kriteria,
        Jenis_Kriteria
      );
      res.status(201).json(newKriteria);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getKriteria = async (req: Request, res: Response) => {
    try {
      const kriteria = await kriteria_service.getKriteria();
      res.status(200).json(kriteria);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getKriteriaById = async (req: Request, res: Response) => {
    const kriteriaId = parseInt(req.params.id);
    if (isNaN(kriteriaId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const kriteria = await kriteria_service.getKriteriaById(kriteriaId);
      console.log("kriteria : ", kriteria);
      if (!kriteria) {
        return res.status(404).json({ message: "Kriteria not found" });
      }
      res.status(200).json(kriteria);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  updateKriteria = async (req: Request, res: Response) => {
    const kriteriaId = parseInt(req.params.id);
    if (isNaN(kriteriaId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updated = req.body;

    try {
      const kriteriaUpdated = await kriteria_service.updateKriteria(kriteriaId, updated)
      if (!kriteriaUpdated) {
        return res.status(404).json({ message: "Kriteria not found" });
      }
      res.status(200).json("Kriteria updated");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteKriteria = async (req: Request, res: Response) => {
    const kriteriaId = parseInt(req.params.id);
    if (isNaN(kriteriaId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    try {
      const deleted = await kriteria_service.deleteKriteria(kriteriaId);
      if (!deleted) {
        return res.status(404).json({ message: "Kriteria not found" });
      }
      res.status(200).json("Kriteria deleted");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new KriteriaController();
