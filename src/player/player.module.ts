import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity';
import { TournamentEvent } from 'src/tournament_event/entities/tournament-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, TournamentScore, TournamentEvent])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
