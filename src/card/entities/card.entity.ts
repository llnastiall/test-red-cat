import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { Min } from 'class-validator';
import {User} from "../../user/entities/user.entity";
import {BaseEntity} from "../../utils/base-entity";

@Entity()
export class Card extends BaseEntity {
    @ApiProperty({ example: 'New card', description: 'Card`s name' })
    @Column({ length: 100 })
    public name: string;

    @ApiProperty()
    @Min(0)
    @Column({ nullable: false, default: 0, type: 'float' } )
    balance: number;

    @ApiPropertyOptional({
        type: () => User,
    })
    @ManyToOne(() => User, user => user.cards)
    user: User;
}