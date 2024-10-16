import { Router } from "express";
import TmpWisataController from "../controllers/TmpWisataController";

const router = Router();

router.post("/tmp-wisata", TmpWisataController.createTempatWisata);
router.get("/tmp-wisata", TmpWisataController.getTempatWisata);
router.get("/tmp-wisata/:id", TmpWisataController.getTempatWisataById);
router.put("/tmp-wisata/:id", TmpWisataController.updateTempatWisata);
router.delete("/tmp-wisata/:id", TmpWisataController.deleteTempatWisata);

export default router