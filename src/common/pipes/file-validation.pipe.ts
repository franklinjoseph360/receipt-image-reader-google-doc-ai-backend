import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from 'src/common/constants/file-upload.constants';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.`,
      );
    }

    return file;
  }
}
