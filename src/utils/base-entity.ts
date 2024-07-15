import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
    @ApiProperty({ example: '1', description: 'unique identifier' })
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ApiProperty({ example: `${Date.now()}`, description: 'Time when created' })
    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date;

    @ApiProperty({ example: `${Date.now()}`, description: 'Time when deleted' })
    @DeleteDateColumn({
        name: 'delete_at',
    })
    public deletedAt: Date;
}
