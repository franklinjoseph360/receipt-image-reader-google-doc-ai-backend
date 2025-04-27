import { Controller, Post, UploadedFile, UseInterceptors, UsePipes, UseGuards, Version } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReceiptService } from './receipt.service';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { ApiGuard } from 'src/common/guards/api.guard';
import { ReceiptResponseDto } from './dto/receipt-response.dto';
import { Throttle } from '@nestjs/throttler';
import { RATE_LIMITTER } from 'src/config/rate-limitter.config';
import { ApiConsumes, ApiSecurity, ApiBody, ApiOperation } from '@nestjs/swagger';


@Controller('receipt')
export class ReceiptController {
    constructor(private readonly receiptService: ReceiptService) { }

    @Post('upload')
    @Version('1')
    @UseGuards(ApiGuard)
    @UseInterceptors(FileInterceptor('receipt'))
    @UsePipes(FileValidationPipe)
    @Throttle({ default: RATE_LIMITTER.upload })
    @ApiOperation({ summary: 'Upload a receipt file to extract structured receipt data' })
    @ApiSecurity('x-api-key')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Receipt file upload',
        schema: {
            type: 'object',
            properties: {
                receipt: {
                    type: 'string',
                    format: 'binary',
                },
            },
            required: ['receipt'],
        },
    })
    async uploadReceipt(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponseDto> {
        return this.receiptService.processReceipt(file);
    }
}