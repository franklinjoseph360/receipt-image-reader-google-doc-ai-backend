import { Controller, Post, UploadedFile, UseInterceptors, UsePipes, UseGuards, Version } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { ApiGuard } from 'src/common/guards/api.guard';
import { ReceiptResponseDto } from './dto/receipt-response.dto';
import { Throttle } from '@nestjs/throttler';


@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('upload')
  @Version('1')
  @UseGuards(ApiGuard)
  @UseInterceptors(FileInterceptor('receipt-file'))
  @UsePipes(FileValidationPipe)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async uploadReceipt(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponseDto> {
    return this.receiptService.processReceipt(file);
  }  
}
