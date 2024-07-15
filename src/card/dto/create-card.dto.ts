import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from "class-validator";

export class CreateCardDto {
    @ApiProperty({ example: 'New card', description: 'Card`s name' })
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}
