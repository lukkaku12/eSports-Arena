import { Match } from "src/match/entities/match.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Generar automáticamente la fecha de creación
    created_at: Date;

    // No es necesario incluir la relación inversa hacia el match aquí
    // ya que en la entidad Match es donde se establecen las relaciones específicas
}