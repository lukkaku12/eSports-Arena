import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ApiKeyGuard } from 'src/auth/guards/x-api-key.guard';

@ApiTags('matches')
@UseGuards(JwtAuthGuard)
@Controller('matches')
@UseInterceptors(ResponseInterceptor)
@UseGuards(ApiKeyGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':tournamentId')
  async getMatches(@Param('tournamentId') tournamentId: number): Promise<Match[]> {
    return this.matchService.generateMatches(tournamentId);
  }
}