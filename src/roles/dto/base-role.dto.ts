import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RoleDto {
    @ApiProperty({ example: 'Admin', description: 'Title of role' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 20) // example length constraint: min 3, max 20 characters
    public value: string;

    @ApiProperty({
        example:
            'An Administrator, or Administrative Assistant, performs clerical duties to help an office run smoothly and efficiently.',
        description: 'Description of role',
    })
    @IsString()
    @IsNotEmpty()
    @Length(10, 200) // example length constraint: min 10, max 200 characters
    public description: string;
}
