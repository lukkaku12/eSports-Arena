import { Module } from '@nestjs/common';
import { TournamentScoreService } from './tournament-score.service';
import { TournamentScoreController } from './tournament-score.controller';

@Module({
  controllers: [TournamentScoreController],
  providers: [TournamentScoreService],
})
export class TournamentScoreModule {}
