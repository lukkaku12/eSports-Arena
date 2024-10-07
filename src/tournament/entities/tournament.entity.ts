import { Match } from "src/match/entities/match.entity";
import { TournamentScores } from "src/tournament-scores/entities/tournament-scores.entity"; // Asegúrate de tener esta entidad
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

    @OneToMany(() => TournamentScores, (tournamentScore) => tournamentScore.tournament)
    tournamentScores: TournamentScores[];
}