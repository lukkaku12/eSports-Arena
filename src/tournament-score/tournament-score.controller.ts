import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TournamentScoreService } from './tournament-score.service';
import { CreateTournamentScoreDto } from './dto/create-tournament-score.dto';
import { UpdateTournamentScoreDto } from './dto/update-tournament-score.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('tournament-score')
@UseGuards(JwtAuthGuard)
@Controller('tournament-score')
@UseInterceptors(ResponseInterceptor)
export class TournamentScoreController {
  constructor(private readonly tournamentScoreService: TournamentScoreService) {}

  @Post()
  create(@Body() createTournamentScoreDto: CreateTournamentScoreDto) {
    return this.tournamentScoreService.create(createTournamentScoreDto);
  }

  @Get()
  @ApiQuery({ name: 'score', required: false, description: 'Filter by score' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })
  findAll(
    @Query('score') score: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tournamentScoreService.findAll(score, page, limit);
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