import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TournamentScore } from "src/tournament-score/entities/tournament-score.entity"; // Asegúrate de que la ruta sea correcta
import { TournamentEvent } from "src/tournament_event/entities/tournament-event.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    created_at: Date;

    @OneToMany(() => TournamentScore, (tournamentScore) => tournamentScore.player)
    tournamentScores: TournamentScore[]; 

    @OneToMany(() => TournamentEvent, (event) => event.player)
tournamentEvents: TournamentEvent[];
}