import { Test, TestingModule } from '@nestjs/testing';
import { TournamentScoreController } from './tournament-score.controller';
import { TournamentScoreService } from './tournament-score.service';

describe('TournamentScoreController', () => {
  let controller: TournamentScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentScoreController],
      providers: [TournamentScoreService],
    }).compile();

    controller = module.get<TournamentScoreController>(TournamentScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
