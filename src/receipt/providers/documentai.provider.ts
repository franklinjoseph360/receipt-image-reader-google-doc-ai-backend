import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import documentaiConfig from 'src/config/documentai.config';

export const GoogleDocumentAIProvider: Provider = {
  provide: documentaiConfig.DOCUMENT_AI_PROVIDER as string,
  useFactory: (configService: ConfigService) => {
    return new DocumentProcessorServiceClient({
      keyFilename: configService.get<string>(documentaiConfig.APPLICATION_CREDENTIALS as string),
    });
  },
  inject: [ConfigService],
};
