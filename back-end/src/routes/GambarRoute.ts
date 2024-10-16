import { Router } from "express";
import  GambarController  from "../controllers/gambarController";

const router =  Router();

router.post("/documentation", GambarController.createGambar);
router.get("/documentation", GambarController.getGambar);
router.get("/documentation/:id", GambarController.getGambarById);
router.get("/documentation/tempat-wisata/:tempatWisataID", GambarController.getGambarByTempatWisataID);
router.put('/documentation/:id', GambarController.updateGambar);
router.delete('/documentation/:id', GambarController.deleteGambar);

export default router
