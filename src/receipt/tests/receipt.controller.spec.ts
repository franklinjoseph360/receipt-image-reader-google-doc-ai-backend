import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptController } from '../receipt.controller';
import { ReceiptService } from '../receipt.service';
import { ApiGuard } from 'src/common/guards/api.guard';
import { ConfigService } from '@nestjs/config';

describe('ReceiptController', () => {
  let controller: ReceiptController;
  let service: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptController],
      providers: [
        {
          provide: ReceiptService,
          useValue: {
            processReceipt: jest.fn().mockResolvedValue({
              total_amount: '122.17',
              net_amount: '104.44',
              total_tax_amount: '7.73',
              supplier_name: 'Hanks Hankies',
              invoice_date: 'Apr 1, 2025',
              currency: 'S$',
              supplier_address: '123 Street\nSingapore\n12345',
              purchase_order: '2025040101',
              invoice_type: '',
              line_item: '54.70 1 54.70 Pink hanky\nThis one is pink.',
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_KEY') return 'test-api-key';
              return null;
            }),
          },
        },
        ApiGuard,
      ],
    }).compile();

    controller = module.get<ReceiptController>(ReceiptController);
    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service and return receipt fields', async () => {
    const mockFile = {
      buffer: Buffer.from('test content'),
      mimetype: 'image/jpeg',
      originalname: 'receipt.jpg',
    } as any;

    const result = await controller.uploadReceipt(mockFile);

    expect(service.processReceipt).toHaveBeenCalledWith(mockFile);
    expect(result).toEqual({
      total_amount: '122.17',
      net_amount: '104.44',
      total_tax_amount: '7.73',
      supplier_name: 'Hanks Hankies',
      invoice_date: 'Apr 1, 2025',
      currency: 'S$',
      supplier_address: '123 Street\nSingapore\n12345',
      purchase_order: '2025040101',
      invoice_type: '',
      line_item: '54.70 1 54.70 Pink hanky\nThis one is pink.',
    });
  });
});
