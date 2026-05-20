import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValueChainsService } from './value-chains.service';
import { ValueChainsController } from './value-chains.controller';
import { ValueChain, ValueChainSchema } from './schemas/value-chain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ValueChain.name, schema: ValueChainSchema }]),
  ],
  controllers: [ValueChainsController],
  providers: [ValueChainsService],
  exports: [ValueChainsService],
})
export class ValueChainsModule {}
