import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from 'src/config/file-upload.config';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_FILE_TYPE);
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    return file;
  }
}
