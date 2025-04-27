import { Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('receipt-file'))
  @UsePipes(FileValidationPipe)
  async uploadReceipt(@UploadedFile() file: Express.Multer.File) {
    return this.receiptService.processReceipt(file);
  }  
}
