import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsBoolean, IsString, IsNumber, Length } from "class-validator";

@Entity()
export class Form {
    @PrimaryGeneratedColumn('uuid')
    uniqueId: UUID;

    @Column()
    @IsString()
    @Length(1, 255)
    title: string;

    @Column({ nullable: true })
    @IsString()
    @Length(1, 255)
    name: string;

    @Column({ nullable: true })
    @IsEmail()
    email: string;

    @Column({ nullable: true })
    @IsNumber()
    phonenumber: number;

    @Column({ nullable: true })
    @IsBoolean()
    isGraduate: boolean;
}
