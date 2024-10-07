import { IsDate, IsString } from "class-validator";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


export class CreateUserDto {

    @PrimaryGeneratedColumn()
    id?: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @CreateDateColumn({type: 'timestamp' })
    created_at: Date;
}