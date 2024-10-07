import { Controller } from '@nestjs/common';
import { TournamentEventService } from './tournament_event.service';

@Controller('tournament-event')
export class TournamentEventController {
  constructor(private readonly tournamentEventService: TournamentEventService) {}
}
