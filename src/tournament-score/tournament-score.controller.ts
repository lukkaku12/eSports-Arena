import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentScoreService } from './tournament-score.service';
import { CreateTournamentScoreDto } from './dto/create-tournament-score.dto';
import { UpdateTournamentScoreDto } from './dto/update-tournament-score.dto';

@Controller('tournament-score')
export class TournamentScoreController {
  constructor(private readonly tournamentScoreService: TournamentScoreService) {}

  @Post()
  create(@Body() createTournamentScoreDto: CreateTournamentScoreDto) {
    return this.tournamentScoreService.create(createTournamentScoreDto);
  }

  @Get()
  findAll() {
    return this.tournamentScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentScoreDto: UpdateTournamentScoreDto) {
    return this.tournamentScoreService.update(+id, updateTournamentScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentScoreService.remove(+id);
  }
}
