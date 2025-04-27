import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { DOCUMENT_AI_CONFIG } from 'src/common/constants/document-ai.constants';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages.constants';

export const GoogleDocumentAIProvider: Provider = {
  provide: DOCUMENT_AI_CONFIG.DOCUMENT_AI_PROVIDER as string,
  useFactory: (configService: ConfigService) => {
    const clientEmail = configService.get<string>(DOCUMENT_AI_CONFIG.GOOGLE_CLIENT_EMAIL);
    const privateKey = configService.get<string>(DOCUMENT_AI_CONFIG.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      throw new Error(ERROR_MESSAGES.MISSING_CREDENTIALS);
    }

    return new DocumentProcessorServiceClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  },
  inject: [ConfigService],
};
