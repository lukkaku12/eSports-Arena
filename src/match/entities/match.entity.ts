import { Player } from "src/player/entities/player.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Match {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Genera automáticamente la fecha de creación
    created_at: Date;

    // Relación con el torneo
    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament: Tournament;

    // Relación con Player 1 (One-to-One)
    @OneToOne(() => Player)
    @JoinColumn({ name: 'player_1_id' }) // Especifica la columna que almacenará el ID de Player 1
    player1: Player;

    // Relación con Player 2 (One-to-One)
    @OneToOne(() => Player)
    @JoinColumn({ name: 'player_2_id' }) // Especifica la columna que almacenará el ID de Player 2
    player2: Player;
}