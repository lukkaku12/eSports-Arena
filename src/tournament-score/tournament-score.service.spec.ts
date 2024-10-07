import { Test, TestingModule } from '@nestjs/testing';
import { TournamentScoreService } from './tournament-score.service';

describe('TournamentScoreService', () => {
  let service: TournamentScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentScoreService],
    }).compile();

    service = module.get<TournamentScoreService>(TournamentScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
