import { Module } from '@nestjs/common';
import { TournamentScoreService } from './tournament-score.service';
import { TournamentScoreController } from './tournament-score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentScore } from './entities/tournament-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentScore])],
  controllers: [TournamentScoreController],
  providers: [TournamentScoreService],
})
export class TournamentScoreModule {}
