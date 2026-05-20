import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StandardsService } from './standards.service';
import { StandardsController } from './standards.controller';
import { Standard, StandardSchema } from './schemas/standard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Standard.name, schema: StandardSchema }]),
  ],
  controllers: [StandardsController],
  providers: [StandardsService],
  exports: [StandardsService],
})
export class StandardsModule {}
