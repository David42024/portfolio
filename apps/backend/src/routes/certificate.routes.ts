import { Router } from "express";
import * as certificateController from "../controllers/certificate.controller";

const router = Router();

// GET /api/v1/certificates - Listar todos los certificados
router.get("/", certificateController.getAllCertificates);

// GET /api/v1/certificates/:id - Detalle de certificado
router.get("/:id", certificateController.getCertificateById);

export default router;