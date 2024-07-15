import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {BaseEntity} from "../../utils/base-entity";
import {Gender} from "../enums/genders.enum";
import {Role} from "../../roles/entities/role.entity";
import {Card} from "../../card/entities/card.entity";

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({ example: 'Name', description: 'User`s name' })
    @Column({ length: 100 })
    public name: string;

    @ApiProperty({ example: 'Surname', description: 'User`s surname' })
    @Column({ length: 100 })
    public surname: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
    @Column({ unique: true })
    public email: string;

    @ApiProperty({ example: '+38(097)3454543', description: 'User`s phone' })
    @Column({
        unique: true,
        nullable: true,
    })
    public phone: string;

    @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
    @Column()
    public password: string;

    @ApiProperty({ example: 'male', description: 'User`s gender' })
    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    public gender: string;

    @ApiProperty({ example: 'User', description: 'User`s role' })
    @ManyToOne(() => Role, role => role.users, { cascade: true, eager: true })
    public role: Role;

    @ApiProperty({ example: 'User', description: 'User`s cads' })
    @OneToMany(() => Card, card => card.user, { cascade: true, eager: true })
    public cards: Card[];
}
