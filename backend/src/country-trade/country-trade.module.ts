import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryTradeService } from './country-trade.service';
import { CountryTradeController } from './country-trade.controller';
import { CountryTrade, CountryTradeSchema } from './schemas/country-trade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CountryTrade.name, schema: CountryTradeSchema }]),
  ],
  controllers: [CountryTradeController],
  providers: [CountryTradeService],
  exports: [CountryTradeService],
})
export class CountryTradeModule {}
