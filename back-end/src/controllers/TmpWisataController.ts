import { TempatWisataService } from "../services/TmpWisataService";
import { Request, Response } from "express";

const tmp_wisata_service = new TempatWisataService();

class TmpWisataController {
  createTempatWisata = async (req: Request, res: Response) => {
    try {
      const {
        namaTempatWisata,
        longitude,
        latitude,
        rating,
        harga,
        jenisWisata,
        deskripsi,
      } = req.body;
      const newTempatWisata = await tmp_wisata_service.createTempatWisata(
        namaTempatWisata,
        longitude,
        latitude,
        rating,
        harga,
        jenisWisata,
        deskripsi
      );
      res.status(201).json(newTempatWisata);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getTempatWisata = async (req: Request, res: Response) => {
    try {
      const tempatWisata = await tmp_wisata_service.getTempatWisata();
      res.status(200).json(tempatWisata);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getTempatWisataById = async (req: Request, res: Response) => {
    const tempatWisataId = parseInt(req.params.id);
    if (isNaN(tempatWisataId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const tempatWisata = await tmp_wisata_service.getTempatWisataById(
        tempatWisataId
      );
      if (!tempatWisata) {
        return res.status(404).json({ message: "Tempat wisata not found" });
      }
      res.status(200).json(tempatWisata);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  updateTempatWisata = async (req: Request, res: Response) => {
    const tempatWisataId = parseInt(req.params.id);
    if (isNaN(tempatWisataId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const update = req.body;

    try {
      const tempatWisataUpdate = await tmp_wisata_service.updateTempatWisata(
        tempatWisataId,
        update
      );
      if (!tempatWisataUpdate) {
        return res.status(404).json({ message: "Tempat wisata not found" });
      }
      res.status(200).json(tempatWisataUpdate);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  deleteTempatWisata = async (req: Request, res: Response) => {
    const tempatWisataId = parseInt(req.params.id);
    if (isNaN(tempatWisataId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const deleted = await tmp_wisata_service.deleteTempatWisata(
        tempatWisataId
      );
      if (!deleted) {
        return res.status(404).json({ message: "Tempat wisata not found" });
      }
      res.status(200).json({ message: "Tempat wisata deleted" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new TmpWisataController();
