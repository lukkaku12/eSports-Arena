import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TournamentEventService } from './tournament_event.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { ApiKeyGuard } from 'src/auth/guards/x-api-key.guard';

@ApiTags('tournament-event')
@UseGuards(JwtAuthGuard)
@UseGuards(ApiKeyGuard)
@Controller('tournament-event')
@UseInterceptors(ResponseInterceptor)
export class TournamentEventController {
  constructor(private readonly tournamentEventService: TournamentEventService) {}

  @Get()
  findAll() {
    return this.tournamentEventService.findAll();
  }

  @Post()
  signIntoTournament(@Body() tournament: CreateTournamentEventDto) {
    return this.tournamentEventService.signIntoTournament(tournament);
  }
}
