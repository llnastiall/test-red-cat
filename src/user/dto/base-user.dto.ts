import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Roles } from "../../roles/enums/roles.enum";
import { Gender } from "../enums/genders.enum";

export class UserDto {
    @ApiProperty({ example: 'Name', description: 'User`s name' })
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @ApiProperty({ example: 'Surname', description: 'User`s surname' })
    @IsString()
    @IsNotEmpty()
    public readonly surname: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'User`s email' })
    @IsEmail()
    @IsNotEmpty()
    public readonly email: string;

    @ApiProperty({ example: '+38(097)3454543', description: 'User`s phone' })
    @IsPhoneNumber("UA")
    @IsNotEmpty()
    public readonly phone: string;

    @ApiProperty({ example: 'P@ssword', description: 'User`s password' })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    public readonly password: string;

    @ApiProperty({ example: 'Male', description: 'User`s gender' })
    @IsEnum(Gender)
    @IsNotEmpty()
    public readonly gender: Gender;

    @ApiProperty({ example: 'User', description: 'User`s role' })
    @IsEnum(Roles)
    @IsNotEmpty()
    public readonly roles: Roles;
}
