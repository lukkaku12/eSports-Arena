import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TournamentScore } from "src/tournament-score/entities/tournament-score.entity"; // Ensure the path is correct
import { TournamentEvent } from "src/tournament_event/entities/tournament-event.entity"; // Ensure the path is correct

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // Add relationships for tournament scores
    @OneToMany(() => TournamentScore, (tournamentScore) => tournamentScore.player)
    tournamentScores: TournamentScore[];

    // Add relationship for tournament events
    @OneToMany(() => TournamentEvent, (event) => event.player)
    tournamentEvents: TournamentEvent[];
}