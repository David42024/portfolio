import { handleFetch } from "../common/controllers/handleFetch";
import { CertificateRepository } from "../repositories/certificate.repository";
import { CACHE_KEYS } from "../config/redis";
import { AppError } from "../utils/AppError";

const certificateRepository = new CertificateRepository();

export const getAllCertificates =  handleFetch(
    () => certificateRepository.findAll(),
    "Error fetching all certificates",
    { cacheKeyFn: CACHE_KEYS.CERTIFICATES }
);

export const getCertificateById = handleFetch(
    async (req) => {
        const certificate = await certificateRepository.findById(req.params.id);
        if (!certificate) {
            throw AppError.notFound(`Certificate with id ${req.params.id} not found`);
        }
        return certificate;
    },
    "Error fetching certificate by ID",
);  