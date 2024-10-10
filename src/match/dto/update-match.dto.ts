import { PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';

export class UpdateResultDto extends PartialType(CreateMatchDto) {}
