import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {WithdrawCardDto} from "./withdraw-card.dto";

export class RemittanceDto extends WithdrawCardDto{
    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    cardIdTo: string

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    userIdTo: string
}