import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlayerService } from '../player/player.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy'; 
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity';
import { TournamentEvent } from 'src/tournament_event/entities/tournament-event.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Player, TournamentScore, TournamentEvent]), 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '60m' }, 
      }),
    }),
  ],
  providers: [AuthService, PlayerService, LocalStrategy, JwtStrategy], 
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}