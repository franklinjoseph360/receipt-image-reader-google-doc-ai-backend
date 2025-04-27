import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptService } from 'src/receipt/receipt.service';
import { ConfigService } from '@nestjs/config';
import { DOCUMENT_AI_CONFIG } from 'src/common/constants/document-ai.constants';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { google } from '@google-cloud/documentai/build/protos/protos';

describe('ReceiptService', () => {
  let service: ReceiptService;
  let clientMock: Partial<DocumentProcessorServiceClient>;

  beforeEach(async () => {
    clientMock = {
      processDocument: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptService,
        {
          provide: DOCUMENT_AI_CONFIG.DOCUMENT_AI_PROVIDER,
          useValue: clientMock,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const env = {
                PROJECT_ID: 'test-project',
                LOCATION: 'us',
                PROCESSOR_ID: 'test-processor-id',
              };
              return env[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error if document is missing', async () => {
    (clientMock.processDocument as jest.Mock).mockResolvedValue([{}]);

    await expect(
      service.processReceipt({
        buffer: Buffer.from('dummy-content'),
        mimetype: 'image/jpeg',
      } as any),
    ).rejects.toThrow('Failed to process receipt');
  });

  it('should successfully parse receipt fields', async () => {
    const mockDocument: google.cloud.documentai.v1.IDocument = {
      entities: [
        { type: 'supplier_name', mentionText: 'Hanks Hankies' },
        { type: 'total_amount', mentionText: '122.17' },
        { type: 'invoice_date', mentionText: 'Apr 1, 2025' },
      ],
    };

    (clientMock.processDocument as jest.Mock).mockResolvedValue([
      { document: mockDocument },
    ]);

    const result = await service.processReceipt({
      buffer: Buffer.from('dummy-content'),
      mimetype: 'image/jpeg',
    } as any);

    expect(result).toEqual({
      supplier_name: 'Hanks Hankies',
      total_amount: '122.17',
      invoice_date: 'Apr 1, 2025',
    });
  });
});
