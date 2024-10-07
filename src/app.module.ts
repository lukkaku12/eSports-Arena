import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { TournamentModule } from './tournament/tournament.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from './match/match.module';
import { TournamentEventModule } from './tournament_event/tournament_event.module';
import { AuthModule } from './auth/auth.module';
import { Match } from './match/entities/match.entity';
import { Tournament } from './tournament/entities/tournament.entity';
import { Player } from './player/entities/player.entity';
import { ResultsModule } from './results/results.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // Asegúrate de que ConfigModule esté importado
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        type: 'postgres',
        host: configservice.get<string>('DB_HOST'),
        port: +configservice.get<number>('DB_PORT'), // Convierte a número
        username: configservice.get<string>('DB_USERNAME'),
        password: configservice.get<string>('DB_PASSWORD'),
        database: configservice.get<string>('DB_NAME'),
        entities: [Player, Tournament, Match],
        synchronize: true, // Cambia a false en producción
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    PlayerModule, TournamentModule, MatchModule, TournamentEventModule, AuthModule, ResultsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
