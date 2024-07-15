import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AddRoleDto {
    @ApiProperty({ example: 'Admin', description: 'New user`s role' })
    @IsString()
    @IsNotEmpty()
    public value: string;

    @ApiProperty({ example: '1', description: 'User`s id' })
    @IsUUID()
    @IsNotEmpty()
    public userId: string;
}
