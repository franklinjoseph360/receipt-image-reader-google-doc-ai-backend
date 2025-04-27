import { Inject, Injectable } from '@nestjs/common';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';
import { google } from '@google-cloud/documentai/build/protos/protos';
import { DOCUMENT_AI_CONFIG } from 'src/config/documentai.config';

@Injectable()
export class ReceiptService {
  private readonly projectId: string;
  private readonly location: string;
  private readonly processorId: string;

  constructor(
    @Inject(DOCUMENT_AI_CONFIG.DOCUMENT_AI_PROVIDER) private readonly client: DocumentProcessorServiceClient,
    private readonly configService: ConfigService) {
    this.projectId = this.configService.get<string>(DOCUMENT_AI_CONFIG.PROJECT_ID);
    this.location = this.configService.get<string>(DOCUMENT_AI_CONFIG.LOCATION);
    this.processorId = this.configService.get<string>(DOCUMENT_AI_CONFIG.PROCESSOR_ID);
  }

  async processReceipt(file: Express.Multer.File) {
    const name = `projects/${this.projectId}/locations/${this.location}/processors/${this.processorId}`;

    const request = {
      name,
      rawDocument: {
        content: file.buffer.toString('base64'),
        mimeType: file.mimetype,
      },
    };

    try {
      const [result] = await this.client.processDocument(request);
      const document = result.document;

      if (!document) {
        throw new Error('No document detected in the response.');
      }

      return this.readDocument(document)
    } catch (error) {
      console.error('Error processing receipt:', error.message);
      throw new Error('Failed to process receipt');
    }
  }

  private readDocument(document: google.cloud.documentai.v1.IDocument): Record<string, any> {
    const fields: Record<string, any> = {};

    if (document.entities) {
      for (const entity of document.entities) {
        if(entity.type) {
            fields[entity.type] = entity.mentionText;
        }
      }
    }

    return fields;
  }
}
