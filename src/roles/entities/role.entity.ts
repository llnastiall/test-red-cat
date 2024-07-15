import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../enums/roles.enum';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {BaseEntity} from "../../utils/base-entity";

@Entity('roles')
export class Role extends BaseEntity {
    @ApiProperty({ example: 'Admin', description: 'Title of role' })
    @Column({ type: 'enum', enum: Roles })
    public value: string;

    @ApiProperty({
        example:
            'An Administrator, or Administrative Assistant, performs clerical duties to help an office run smoothly and efficiently. ',
        description: 'Description of role',
    })
    @Column({ length: 100 })
    public description: string;

    @ApiProperty({ example: 'User1, User2', description: 'Users who has this role' })
    @OneToMany(() => User, user => user.role)
    users: User[];
}
