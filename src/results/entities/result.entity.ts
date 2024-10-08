import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Match } from "src/match/entities/match.entity"; // Ensure the path is correct
import { Player } from "src/player/entities/player.entity"; // Ensure the path is correct

@Entity()
export class Result {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Match, (match) => match.results) // Ensure that `results` is defined in Match entity
    match: Match;

    @ManyToOne(() => Player, { nullable: false }) // Ensure that the relationship is not nullable
    winner: Player;

    @ManyToOne(() => Player, { nullable: false }) // Ensure that the relationship is not nullable
    loser: Player;

    @Column()
    winner_score: number;

    @Column()
    loser_score: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}