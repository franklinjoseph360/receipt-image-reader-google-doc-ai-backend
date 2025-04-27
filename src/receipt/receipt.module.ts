import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { GoogleDocumentAIProvider } from './providers/documentai.provider';
import { DocumentAIHelperService } from 'src/common/helpers/document-ai.helper';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService, GoogleDocumentAIProvider, DocumentAIHelperService]
})
export class ReceiptModule { }