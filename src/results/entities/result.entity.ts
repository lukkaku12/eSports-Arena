import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    match_id: number;

    @Column()
    winner_id: number;

    @Column()
    loser_id: number;

    @Column()
    winner_score: number;

    @Column()
    loser_score: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}