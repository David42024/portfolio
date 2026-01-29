import { handleFetch } from "../common/controllers/handleFetch";
import { CertificateRepository } from "../repositories/certificate.repository";

const certificateRepository = new CertificateRepository();

export const getAllCertificates =  handleFetch(
    () => certificateRepository.findAll(),
    "Error fetching all certificates"
);

export const getCertificateById = handleFetch(
    (req) => certificateRepository.findById(req.params.id),
    "Error fetching certificate by ID"
);
