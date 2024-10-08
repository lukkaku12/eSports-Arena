import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEvent } from './entities/tournament-event.entity';

@Injectable()
export class TournamentEventService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
  ) {}

  // Method to find all tournament events
  async findAll(): Promise<TournamentEvent[]> {
    const tournamentEvents = await this.tournamentEventRepository.find();
    if (!tournamentEvents.length) {
      throw new NotFoundException('No tournament events found');
    }
    return tournamentEvents;
  }
}