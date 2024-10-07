import { Test, TestingModule } from '@nestjs/testing';
import { TournamentEventController } from './tournament_event.controller';
import { TournamentEventService } from './tournament_event.service';

describe('TournamentEventController', () => {
  let controller: TournamentEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentEventController],
      providers: [TournamentEventService],
    }).compile();

    controller = module.get<TournamentEventController>(TournamentEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
