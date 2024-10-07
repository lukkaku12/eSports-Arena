import { Module } from '@nestjs/common';
import { TournamentEventService } from './tournament_event.service';
import { TournamentEventController } from './tournament_event.controller';

@Module({
  controllers: [TournamentEventController],
  providers: [TournamentEventService],
})
export class TournamentEventModule {}
