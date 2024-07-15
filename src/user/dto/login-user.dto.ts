import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
    @IsEmail()
    @IsNotEmpty()
    public readonly email: string;

    @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
    @IsString()
    @IsNotEmpty()
    public readonly password: string;
}
