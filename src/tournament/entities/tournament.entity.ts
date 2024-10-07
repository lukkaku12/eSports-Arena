import { Match } from "src/match/entities/match.entity";
import { TournamentScore } from "src/tournament-score/entities/tournament-score.entity"; // Asegúrate de tener esta entidad
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
}