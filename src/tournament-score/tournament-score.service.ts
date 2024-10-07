import { Injectable } from '@nestjs/common';
import { CreateTournamentScoreDto } from './dto/create-tournament-score.dto';
import { UpdateTournamentScoreDto } from './dto/update-tournament-score.dto';

@Injectable()
export class TournamentScoreService {
  create(createTournamentScoreDto: CreateTournamentScoreDto) {
    return 'This action adds a new tournamentScore';
  }

  findAll() {
    return `This action returns all tournamentScore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentScore`;
  }

  update(id: number, updateTournamentScoreDto: UpdateTournamentScoreDto) {
    return `This action updates a #${id} tournamentScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentScore`;
  }
}
