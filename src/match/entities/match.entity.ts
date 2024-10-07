import { Player } from "src/player/entities/player.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Match {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    created_at: Date;

    
    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament: Tournament;

    
    @OneToOne(() => Player)
    @JoinColumn({ name: 'player_1_id' }) 
    player1: Player;

   
    @OneToOne(() => Player)
    @JoinColumn({ name: 'player_2_id' })
    player2: Player;
}