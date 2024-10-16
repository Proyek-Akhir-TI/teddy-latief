import { Request, Response } from "express";
import { GambarService } from "../services/gambarService";

const gambarService = new GambarService();

class GambarController{
  async createGambar(req: Request, res: Response) {
    try {
      const { url, tempatWisataID } = req.body;
      const newGambar = await gambarService.createGambar(url, tempatWisataID);
      res.status(201).json(newGambar);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getGambar(req: Request, res: Response) {
    try {
      const gambar = await gambarService.getGambar();
      res.status(200).json(gambar);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getGambarById(req: Request, res: Response) {
    const gambarId = parseInt(req.params.id);
    if (isNaN(gambarId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const gambar = await gambarService.getGambarById(gambarId);
      if (!gambar) {
        return res.status(404).json({ message: "Gambar not found" });
      }
      res.status(200).json(gambar);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  
  async getGambarByTempatWisataID(req: Request, res: Response) {
    const tempatWisataID = parseInt(req.params.tempatWisataID);
    if (isNaN(tempatWisataID)) {
      return res.status(400).json({ message: "Invalid TempatWisataID" });
    }

    try {
      const gambar = await gambarService.getGambarByTempatWisataID(tempatWisataID);
      if (gambar.length === 0) {
        return res.status(404).json({ message: "No Gambar found for this TempatWisataID" });
      }
      res.status(200).json(gambar);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async updateGambar(req: Request, res: Response) {
    const gambarId = parseInt(req.params.id);
    if (isNaN(gambarId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updated = req.body;

    try {
      const gambarUpdated = await gambarService.updateGambar(gambarId, updated)
      if (!gambarUpdated) {
        return res.status(404).json({ message: "Gambar not found" });
      }
      res.status(200).json("Gambar updated");
    }catch(error){
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteGambar(req: Request, res: Response) {
    const gambarId = parseInt(req.params.id);
    if (isNaN(gambarId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    try {
      const gambar = await gambarService.getGambarById(gambarId);
      if (!gambar) {
        return res.status(404).json({ message: "Gambar not found" });
      }
      await gambarService.deleteGambar(gambarId);
      res.status(200).json("Gambar deleted");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new GambarController()