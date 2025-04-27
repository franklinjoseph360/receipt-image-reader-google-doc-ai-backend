import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { GoogleDocumentAIProvider } from './providers/documentai.provider';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, GoogleDocumentAIProvider]
})
export class ReceiptModule { }