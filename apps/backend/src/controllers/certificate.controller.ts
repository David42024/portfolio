import { handleFetch } from "../common/controllers/handleFetch";
import { CertificateRepository } from "../repositories/certificate.repository";
import { CACHE_KEYS } from "../config/redis";

const certificateRepository = new CertificateRepository();

export const getAllCertificates =  handleFetch(
    () => certificateRepository.findAll(),
    "Error fetching all certificates",
    { cacheKeyFn: CACHE_KEYS.CERTIFICATES }
);

export const getCertificateById = handleFetch(
    (req) => certificateRepository.findById(req.params.id),
    "Error fetching certificate by ID",
);
