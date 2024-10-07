import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tournament } from "src/tournament/entities/tournament.entity"; 
import { Player } from "src/player/entities/player.entity"; 

@Entity()
export class TournamentEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tournament_id: number;

    @Column()
    player_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    joined_at: Date;

    @ManyToOne(() => Tournament, (tournament) => tournament.tournamentEvents)
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @ManyToOne(() => Player, (player) => player.tournamentEvents)
    @JoinColumn({ name: 'player_id' })
    player: Player;
}