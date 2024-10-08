
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Player } from "src/player/entities/player.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class TournamentScore {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    score: number;

    @Column({ name: 'tournamentId' }) // Ensure this matches your column name
    tournamentId: number;

    @ManyToOne(() => Player, player => player.tournamentScores) // Assuming Player has a tournamentScores property
    player: Player;

    @ManyToOne(() => Tournament, tournament => tournament.tournamentScores) // Assuming Tournament has a tournamentScores property
    tournament: Tournament;
}