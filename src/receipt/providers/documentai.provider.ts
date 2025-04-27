import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { DOCUMENT_AI_CONFIG } from 'src/common/constants/document-ai.constants';

export const GoogleDocumentAIProvider: Provider = {
  provide: DOCUMENT_AI_CONFIG.DOCUMENT_AI_PROVIDER as string,
  useFactory: (configService: ConfigService) => {
    return new DocumentProcessorServiceClient({
      keyFilename: configService.get<string>(DOCUMENT_AI_CONFIG.APPLICATION_CREDENTIALS as string),
    });
  },
  inject: [ConfigService],
};
