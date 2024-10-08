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
import { TournamentScoreModule } from './tournament-score/tournament-score.module';
import { TournamentScore } from './tournament-score/entities/tournament-score.entity';
import { TournamentEvent } from './tournament_event/entities/tournament-event.entity';
import { Result } from './results/entities/result.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        type: 'postgres',
        host: configservice.get<string>('DB_HOST'),
        port: +configservice.get<number>('DB_PORT'), 
        username: configservice.get<string>('DB_USERNAME'),
        password: configservice.get<string>('DB_PASSWORD'),
        database: configservice.get<string>('DB_NAME'),
        entities: [Player, Tournament, Match, TournamentScore, TournamentEvent, Result],
        synchronize: true, 
        ssl: {
          rejectUnauthorized: false,
        },
        
      }),
      
    }),
    PlayerModule, TournamentModule, MatchModule, TournamentEventModule, AuthModule, ResultsModule, TournamentScoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
