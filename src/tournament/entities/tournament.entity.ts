import { Match } from "src/match/entities/match.entity";
import { TournamentScore } from "src/tournament-score/entities/tournament-score.entity"; // Asegúrate de tener esta entidad
import { TournamentEvent } from "src/tournament_event/entities/tournament-event.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tournament_name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    password?: string;

    @OneToMany(() => Match, (match) => match.tournament)
    matches: Match[];

    @OneToMany(() => TournamentScore, (tournamentScore) => tournamentScore.tournament)
    tournamentScores: TournamentScore[]; 

    @OneToMany(() => TournamentEvent, (event) => event.tournament)
tournamentEvents: TournamentEvent[];
}