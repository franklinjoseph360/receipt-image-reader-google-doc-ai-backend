import { Injectable } from '@nestjs/common';
import { google } from '@google-cloud/documentai/build/protos/protos';

@Injectable()
export class DocumentAIHelperService {
  
  extractReceiptFields<T extends Record<string, any>>(document: google.cloud.documentai.v1.IDocument): T {
    const fields: Record<string, any> = {};

    if (document.entities) {
      for (const entity of document.entities) {
        if (entity.type) {
          const camelCaseType = this.toCamelCase(entity.type);
          fields[camelCaseType] = entity.mentionText;
        }
      }
    }

    return fields as T;
  }

  private toCamelCase(text: string): string {
    return text.toLowerCase().replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  }
}
