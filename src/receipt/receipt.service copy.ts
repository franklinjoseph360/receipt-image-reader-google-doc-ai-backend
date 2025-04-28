import { Injectable } from '@nestjs/common';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReceiptService {
  private readonly client: DocumentProcessorServiceClient;
  private readonly projectId: string;
  private readonly location: string;
  private readonly processorId: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new DocumentProcessorServiceClient({
      keyFilename: this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'),
    });

    this.projectId = this.configService.get<string>('PROJECT_ID');
    this.location = this.configService.get<string>('LOCATION');
    this.processorId = this.configService.get<string>('PROCESSOR_ID');
  }

  async processReceipt(file: Express.Multer.File) {
    const name = `projects/${this.projectId}/locations/${this.location}/processors/${this.processorId}`;

    const request = {
      name,
      rawDocument: {
        content: file.buffer.toString('base64'), // Convert file buffer to Base64
        mimeType: file.mimetype, // e.g., 'application/pdf' or 'image/jpeg'
      },
    };

    try {
      const [result] = await this.client.processDocument(request);
      const document = result.document;

      if (!document) {
        throw new Error('No document detected in the response.');
      }

      return this.extractFields(document);
    } catch (error) {
      console.error('Error processing receipt:', error.message);
      throw new Error('Failed to process receipt');
    }
  }

  private extractFields(document: any) {
    const fields: Record<string, any> = {};

    if (document.entities) {
      for (const entity of document.entities) {
        const key = this.camelCase(entity.type);
        fields[key] = entity.mentionText;
      }
    }

    return fields;
  }

  private camelCase(str: string): string {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  }
}
