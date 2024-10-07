import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity'; // Asegúrate de que la ruta sea correcta
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return await this.tournamentRepository.save(tournament);
  }

  async findAll(): Promise<Tournament[]> {
    return await this.tournamentRepository.find();
  }

  async findOne(id: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ where: { id } });
    if (!tournament) {
      throw new NotFoundException(`Tournament with id ${id} not found`);
    }
    return tournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    const tournament = await this.findOne(id); // Verifica si existe el torneo

    // Actualiza los campos del torneo
    Object.assign(tournament, updateTournamentDto);
    
    return await this.tournamentRepository.save(tournament);
  }

  async remove(id: number): Promise<void> {
    const tournament = await this.findOne(id); // Verifica si existe el torneo

    await this.tournamentRepository.remove(tournament);
  }
}