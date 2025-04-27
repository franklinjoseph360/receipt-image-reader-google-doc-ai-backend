import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptService } from 'src/receipt/receipt.service';
import { ConfigService } from '@nestjs/config';
import { DOCUMENT_AI_CONFIG } from 'src/config/documentai.config';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';

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
      service.processReceipt({ buffer: Buffer.from('test'), mimetype: 'application/pdf' } as any)
    ).rejects.toThrow('Failed to process receipt');
  });
});
