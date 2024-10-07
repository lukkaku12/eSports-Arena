import { Controller } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
}
