import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerService } from 'src/player/player.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/entities/player.entity';
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { TournamentEvent } from 'src/tournament_event/entities/tournament-event.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Player, TournamentScore, TournamentEvent, Tournament, Result])],
  controllers: [MatchController],
  providers: [MatchService, PlayerService, TournamentService],
})
export class MatchModule {}
