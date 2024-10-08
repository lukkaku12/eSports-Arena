import { Injectable } from '@nestjs/common';
import { CreateTournamentScoreDto } from './dto/create-tournament-score.dto';
import { UpdateTournamentScoreDto } from './dto/update-tournament-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentScore } from './entities/tournament-score.entity';

@Injectable()
export class TournamentScoreService {
  constructor(
    @InjectRepository(TournamentScore)
    private readonly tournamentScoreRepository: Repository<TournamentScore>,
  ) {}

  create(createTournamentScoreDto: CreateTournamentScoreDto) {
    const tournamentScore = this.tournamentScoreRepository.create(createTournamentScoreDto);
    return this.tournamentScoreRepository.save(tournamentScore);
  }

  async findAll(filterByScore: number, page: number = 1, limit: number = 10) {
    const [result, total] = await this.tournamentScoreRepository.findAndCount({
      where: { score: filterByScore },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: result,
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return await this.tournamentScoreRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateTournamentScoreDto: UpdateTournamentScoreDto) {
    return this.tournamentScoreRepository.update(id, updateTournamentScoreDto);
  }

  remove(id: number) {
    return this.tournamentScoreRepository.delete(id);
  }
}