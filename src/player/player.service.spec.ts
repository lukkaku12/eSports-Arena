import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { TournamentScore } from '../tournament-score/entities/tournament-score.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

jest.mock('bcrypt');

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepository: Repository<Player>;
  let tournamentScoreRepository: Repository<TournamentScore>;

  const mockPlayerRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockTournamentScoreRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
        {
          provide: getRepositoryToken(TournamentScore),
          useValue: mockTournamentScoreRepository,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    tournamentScoreRepository = module.get<Repository<TournamentScore>>(getRepositoryToken(TournamentScore));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('createPlayer', () => {
    it('should create and save a new player', async () => {
      const createPlayerDto: CreateUserDto = {
        name: 'Test Player',
        email: 'test@example.com',
        password: 'testpassword',
        created_at: new Date(),
      };

      mockPlayerRepository.findOne.mockResolvedValue(undefined); // No existing player
      mockPlayerRepository.create.mockReturnValue(createPlayerDto);
      mockPlayerRepository.save.mockResolvedValue(createPlayerDto);

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');


      const result = await service.createPlayer(createPlayerDto);

      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 10);
      expect(playerRepository.create).toHaveBeenCalledWith({
        name: 'Test Player',
        email: 'test@example.com',
        password: 'hashedpassword',
      });
      expect(playerRepository.save).toHaveBeenCalledWith(createPlayerDto);
      expect(result).toEqual(createPlayerDto);
    });

    it('should throw a BadRequestException if player already exists', async () => {
      const createPlayerDto: CreateUserDto = {
        name: 'Test Player',
        email: 'test@example.com',
        password: 'testpassword',
        created_at: new Date(),
      };

      mockPlayerRepository.findOne.mockResolvedValue(createPlayerDto);

      await expect(service.createPlayer(createPlayerDto)).rejects.toThrow(BadRequestException);
      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });
  });

  describe('findByEmail', () => {
    it('should return a player by email', async () => {
      const player = { id: 1, name: 'Test Player', email: 'test@example.com' } as Player;
      mockPlayerRepository.findOne.mockResolvedValue(player);

      const result = await service.findByEmail('test@example.com');

      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(player);
    });
  });

  describe('findById', () => {
    it('should return a player by ID', async () => {
      const player = { id: 1, name: 'Test Player' } as Player;
      mockPlayerRepository.findOne.mockResolvedValue(player);

      const result = await service.findById(1);

      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(player);
    });
  });

  describe('updatePlayer', () => {
    it('should update a player if exists', async () => {
      const player = { id: 1, name: 'Test Player' } as Player;
      const updateData = { name: 'Updated Player' };
      mockPlayerRepository.findOne.mockResolvedValue(player);
      mockPlayerRepository.save.mockResolvedValue({ ...player, ...updateData });

      const result = await service.updatePlayer(1, updateData);

      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(playerRepository.save).toHaveBeenCalledWith({ ...player, ...updateData });
      expect(result).toEqual({ ...player, ...updateData });
    });

    it('should throw BadRequestException if player is not found', async () => {
      mockPlayerRepository.findOne.mockResolvedValue(undefined);

      await expect(service.updatePlayer(1, { name: 'Updated Player' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('deletePlayer', () => {
    it('should delete a player if exists', async () => {
      const player = { id: 1, name: 'Test Player' } as Player;
      mockPlayerRepository.findOne.mockResolvedValue(player);
      mockPlayerRepository.delete.mockResolvedValue(undefined);

      await service.deletePlayer(1);

      expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(playerRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if player is not found', async () => {
      mockPlayerRepository.findOne.mockResolvedValue(undefined);

      await expect(service.deletePlayer(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findPlayersByTournament', () => {
    it('should return players by tournament ID', async () => {
      const tournamentScores = [
        { player: { id: 1 } },
        { player: { id: 2 } },
      ] as TournamentScore[];
      const players = [{ id: 1 }, { id: 2 }] as Player[];

      mockTournamentScoreRepository.find.mockResolvedValue(tournamentScores);
      mockPlayerRepository.find.mockResolvedValue(players);

      const result = await service.findPlayersByTournament(1);

      expect(tournamentScoreRepository.find).toHaveBeenCalledWith({
        where: { tournamentId: 1 },
        relations: ['player'],
      });
      expect(playerRepository.find).toHaveBeenCalledWith({
        where: { id: expect.arrayContaining([1, 2]) },
      });
      expect(result).toEqual(players);
    });

    it('should throw NotFoundException if no players found', async () => {
      mockTournamentScoreRepository.find.mockResolvedValue([]);

      await expect(service.findPlayersByTournament(1)).rejects.toThrow(NotFoundException);
    });
  });
});