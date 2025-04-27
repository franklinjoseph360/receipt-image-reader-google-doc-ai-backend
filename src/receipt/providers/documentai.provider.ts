import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import constants from 'src/shared/constants';

export const GoogleDocumentAIProvider: Provider = {
  provide: constants.DOCUMENT_AI_PROVIDER as string,
  useFactory: (configService: ConfigService) => {
    return new DocumentProcessorServiceClient({
      keyFilename: configService.get<string>(constants.GOOGLE_APPLICATION_CREDENTIALS as string),
    });
  },
  inject: [ConfigService],
};
