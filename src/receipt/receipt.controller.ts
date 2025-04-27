import { Controller, Post, UploadedFile, UseInterceptors, UsePipes, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { ApiGuard } from 'src/common/guards/api.guard';
import { ReceiptResponseDto } from './dto/receipt-response.dto';


@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('upload')
  @UseGuards(ApiGuard)
  @UseInterceptors(FileInterceptor('receipt-file'))
  @UsePipes(FileValidationPipe)
  async uploadReceipt(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponseDto> {
    return this.receiptService.processReceipt(file);
  }  
}
