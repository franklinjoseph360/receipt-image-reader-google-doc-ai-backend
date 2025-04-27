import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
