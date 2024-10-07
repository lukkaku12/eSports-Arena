import { Test, TestingModule } from '@nestjs/testing';
import { TournamentEventService } from './tournament_event.service';

describe('TournamentEventService', () => {
  let service: TournamentEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentEventService],
    }).compile();

    service = module.get<TournamentEventService>(TournamentEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
