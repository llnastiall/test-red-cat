import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {RolesService} from "../roles/roles.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "../roles/entities/role.entity";
import {DataSource, getManager, Repository} from "typeorm";
import {Card} from "./entities/card.entity";
import {User} from "../user/entities/user.entity";
import {UserService} from "../user/user.service";
import {WithdrawCardDto} from "./dto/withdraw-card.dto";
import {DepositCardDto} from "./dto/deposit-card.dto";
import {RemittanceDto} from "./dto/remittance.dto";
import axios from "axios";

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private cardRepository: Repository<Card>,
              @InjectRepository(User) private userRepository: Repository<User>,
              private userService: UserService,
              private dataSource: DataSource
  ) {}
  
  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    const newCard = await this.cardRepository.create(createCardDto);
    const user = await this.userService.getUserById(userId);
    user.cards.push(newCard);
    await this.cardRepository.save(newCard);
    await this.userRepository.save(user);
    return newCard;
  }

  async findAll(userId: string): Promise<Card[]> {
    const user = await this.userService.getUserById(userId);
    return user.cards;
  }


  async withdraw(userId: string, withdrawCardDto: WithdrawCardDto) {
    const foundCardRecord = await this.cardRepository.findOne({
      where: {
        user: { id: userId },
        id: withdrawCardDto.cardId
      }
    });
    if (!foundCardRecord) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    return this.decreaseBalance('WITHDRAW', foundCardRecord, { userId, ...withdrawCardDto });
  }

  private async decreaseBalance(process, cardRecord, data) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const newBalance = cardRecord.balance + (data.amount * -1);

      if (newBalance < 0) {
        throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'Insufficient balance',
            },
            HttpStatus.UNPROCESSABLE_ENTITY);
      }

      cardRecord.balance = newBalance;
      await queryRunner.manager.save(Card, cardRecord);

      await queryRunner.commitTransaction();
      await this.sendWebhook({
        ...cardRecord
      });
      return {
        cardRecord,
        process,
        user_id: data.userId,
        currency_id: data.cardId ?? cardRecord.id,
        amount: data.amount
      }
    }catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async deposit(userId: string, topUpCardDto: DepositCardDto) {

    const foundCardRecord = await this.cardRepository.findOne({
      where: {
        user: {id: userId},
        id: topUpCardDto.cardId
      }
    });
    if (!foundCardRecord) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    return this.increaseBalance('DEPOSIT', foundCardRecord, { userId, ...topUpCardDto });

  }

  private async increaseBalance(process, cardRecord, data) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      cardRecord.balance = cardRecord.balance + data.amount;

      await queryRunner.manager.save(Card, cardRecord);

      await queryRunner.commitTransaction();
      await this.sendWebhook({
        ...cardRecord
      });
      return {
        cardRecord,
        process,
        user_id: data.userId,
        currency_id: data.cardId ?? cardRecord.id,
        amount: data.amount
      }
    }catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }

  }

  async remittance(userIdFrom: string, remittanceDto: RemittanceDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const senderCard = await this.cardRepository.findOne({
        where: { user: { id: userIdFrom }, id: remittanceDto.cardId }
      });

      const receiverCard = await this.cardRepository.findOne({
        where: { user: { id: remittanceDto.userIdTo }, id: remittanceDto.cardIdTo}
      });

      if (!senderCard || !receiverCard) {
        throw new HttpException('Sender or receiver card not found', HttpStatus.NOT_FOUND);
      }

      if (senderCard.balance < remittanceDto.amount) {
        throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
      }

      senderCard.balance -= remittanceDto.amount;
      receiverCard.balance += remittanceDto.amount;

      await queryRunner.manager.save(Card, senderCard);
      await queryRunner.manager.save(Card, receiverCard);

      await queryRunner.commitTransaction();
      await this.sendWebhook({
        userIdFrom: userIdFrom,
        userIdTo: remittanceDto.userIdTo,
        amount: remittanceDto.amount,
        cardIdFrom: remittanceDto.cardId,
        cardIdTo: remittanceDto.cardIdTo
      });
      return {
        senderCard,
        receiverCard
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }
  private async sendWebhook(transactionDetails: any) {
    try {
      await axios.post('https://webhook.site/0c6fc9d4-7ff9-408f-9646-40d7b2e67203', transactionDetails);
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  }
}
