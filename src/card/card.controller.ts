import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Card} from "./entities/card.entity";
import {WithdrawCardDto} from "./dto/withdraw-card.dto";
import {DepositCardDto} from "./dto/deposit-card.dto";
import {RemittanceDto} from "./dto/remittance.dto";

@ApiTags('Card')
// @UseGuards(JwtAuthGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto, userId);
  }

  @Get(':userId')
  findAll(@Param('id') userId: string): Promise<Card[]> {
    return this.cardService.findAll(userId);
  }

  @Post('/withdraw/:userId')
  withdraw(@Param('id') userId: string, @Body() withdrawCardDto: WithdrawCardDto) {
    return this.cardService.withdraw(userId, withdrawCardDto);
  }

  @Post('/deposit/:userId')
  deposit(@Param('id') userId: string, @Body() depositCardDto: DepositCardDto) {
    return this.cardService.deposit(userId, depositCardDto);
  }

  @Post('remittance/:userIdFrom')
  remittance(@Param('id') userIdFrom: string, @Body() remittanceDto: RemittanceDto){
    return this.cardService.remittance(userIdFrom, remittanceDto);
  }
}
