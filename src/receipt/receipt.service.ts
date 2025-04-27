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
    console.log('name', name)
  }
}
