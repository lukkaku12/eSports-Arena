import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Tournament } from "src/tournament/entities/tournament.entity"; // Ensure the path is correct
import { Player } from "src/player/entities/player.entity"; // Ensure the path is correct
import { Result } from "src/results/entities/result.entity"; // Ensure the path is correct

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    // Remove these columns since we will use relationships
    // @Column()
    // tournament_id: number;

    // @Column()
    // player_1_id: number;

    // @Column()
    // player_2_id: number;

    @Column()
    status: string; // You might want to define this as an enum for better control over possible values

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    // Establish relationships
    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @ManyToOne(() => Player, (player) => player.tournamentEvents)
    @JoinColumn({ name: 'player_1_id' }) // This references the player's ID in the join table
    player1: Player;

    @ManyToOne(() => Player, (player) => player.tournamentEvents)
    @JoinColumn({ name: 'player_2_id' }) // This references the player's ID in the join table
    player2: Player;

    // Add the following line to establish the one-to-many relationship with Result
    @OneToMany(() => Result, (result) => result.match)
    results: Result[];
}