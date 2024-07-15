import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WithdrawCardDto {
    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    cardId: string;

    @ApiProperty({ example: '10' })
    @IsNotEmpty()
    amount: number;
}