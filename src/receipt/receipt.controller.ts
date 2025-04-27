import { Controller, Post, UploadedFile, UseInterceptors, UsePipes, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { ApiGuard } from 'src/common/guard/api.guard';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('upload')
  @UseGuards(ApiGuard)
  @UseInterceptors(FileInterceptor('receipt-file'))
  @UsePipes(FileValidationPipe)
  async uploadReceipt(@UploadedFile() file: Express.Multer.File) {
    return this.receiptService.processReceipt(file);
  }  
}
