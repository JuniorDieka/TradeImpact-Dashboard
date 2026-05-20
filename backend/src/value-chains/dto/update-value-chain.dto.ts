import { PartialType } from '@nestjs/swagger';
import { CreateValueChainDto } from './create-value-chain.dto';

export class UpdateValueChainDto extends PartialType(CreateValueChainDto) {}
