import { Module } from '@nestjs/common';
import { TournamentEventService } from './tournament_event.service';
import { TournamentEventController } from './tournament_event.controller';
import { TournamentEvent } from './entities/tournament-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEvent])],
  controllers: [TournamentEventController],
  providers: [TournamentEventService],
})
export class TournamentEventModule {}
