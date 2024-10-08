import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlayerService } from '../player/player.service'; // Asegúrate de tener esta importación
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity'; // Importa la entidad Player
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy'; // Define tus estrategias
import { JwtStrategy } from './strategies/jwt.strategy'; // Define tus estrategias
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Player, TournamentScore]), // Registra la entidad Player
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Usa tu variable de entorno
        signOptions: { expiresIn: '60m' }, // Configura la expiración del token
      }),
    }),
  ],
  providers: [AuthService, PlayerService, LocalStrategy, JwtStrategy], // Incluye el PlayerService
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}