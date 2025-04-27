import { API_CONFIG } from "./api.constants";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_MB } from "../../config/file-upload.config";

export const ERROR_MESSAGES = {
    INVALID_API_KEY: `Invalid or missing ${API_CONFIG.API_HEADER_KEY} header`,
    NO_FILE_PROVIDED: 'No file provided.',
    INVALID_FILE_TYPE: `Invalid file type. Allowed types are: ${ALLOWED_MIME_TYPES.join(', ')}`,
    FILE_TOO_LARGE: `File too large. Maximum allowed limit ${MAX_FILE_SIZE_MB} MB`,
    FAILED_TO_PROCESS_RECEIPT: 'Failed to process receipt',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
};