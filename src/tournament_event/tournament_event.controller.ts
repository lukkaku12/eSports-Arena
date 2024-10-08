import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { TournamentEventService } from './tournament_event.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('tournament-event')
@UseGuards(JwtAuthGuard)
@Controller('tournament-event')
@UseInterceptors(ResponseInterceptor)
export class TournamentEventController {
  constructor(private readonly tournamentEventService: TournamentEventService) {}

  @Get()
  findAll() {
    return this.tournamentEventService.findAll();
  }
}
