import { Router } from "express";
import KriteriaController from "../controllers/KriteriaController";

const router = Router();

router.post("/kriteria", KriteriaController.createKriteria);
router.get("/kriteria", KriteriaController.getKriteria);
router.get("/kriteria/:id", KriteriaController.getKriteriaById);
router.put("/kriteria/:id", KriteriaController.updateKriteria);
router.delete("/kriteria/:id", KriteriaController.deleteKriteria);

export default router