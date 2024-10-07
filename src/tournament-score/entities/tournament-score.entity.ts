import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tournament } from "src/tournament/entities/tournament.entity"; // Asegúrate de que la ruta sea correcta
import { Player } from "src/player/entities/player.entity"; // Asegúrate de que la ruta sea correcta

@Entity()
export class TournamentScore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tournament_id: number;

    @Column()
    player_id: number;

    @Column()
    score: number;

    @ManyToOne(() => Tournament, (tournament) => tournament.tournamentScores)
    tournament: Tournament;

    @ManyToOne(() => Player, (player) => player.tournamentScores)
    player: Player;
}