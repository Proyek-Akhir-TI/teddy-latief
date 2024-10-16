import { Router } from "express";
import AksebilitasController from "../controllers/AksebilitasController";

const router = Router();

router.post("/aksebilitas", AksebilitasController.createAksebilitas);
router.get("/aksebilitas", AksebilitasController.getAksebilitas);
router.get("/aksebilitas/:id", AksebilitasController.getAksebilitasById);
router.put("/aksebilitas/:id", AksebilitasController.updateAksebilitas);
router.delete("/aksebilitas/:id", AksebilitasController.deleteAksebilitas);
router.get('/aksebilitas-with-tempat-wisata', AksebilitasController.getAksebilitasWithTempatWisata);
router.get('/count-aksebilitas', AksebilitasController.countAksebilitasPerTempatWisata);
export default router