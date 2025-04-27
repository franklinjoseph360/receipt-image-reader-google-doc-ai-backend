import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptController } from 'src/receipt/receipt.controller';
import { ReceiptService } from 'src/receipt/receipt.service';

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
              merchantName: 'Dummy Merchant',
              totalAmount: '500.25',
              transactionDate: '2023-03-12',
            }),
          },
        },
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
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
      originalname: 'test-receipt.jpg',
    } as any;
  
    const result = await controller.uploadReceipt(mockFile);
  
    expect(service.processReceipt).toHaveBeenCalledWith(mockFile);
    expect(result).toEqual({
      merchantName: 'Dummy Merchant',
      totalAmount: '500.25',
      transactionDate: '2023-03-12',
    });
  });
  
});
