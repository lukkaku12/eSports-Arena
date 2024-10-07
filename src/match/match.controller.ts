import { Controller, Get, Param } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':tournamentId')
  async getMatches(@Param('tournamentId') tournamentId: number): Promise<Match[]> {
    return this.matchService.generateMatches(tournamentId);
  }
}