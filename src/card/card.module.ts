import {forwardRef, Module} from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Card} from "./entities/card.entity";
import {JwtModule} from "@nestjs/jwt";
import {RolesModule} from "../roles/roles.module";
import {Role} from "../roles/entities/role.entity";
import {UserModule} from "../user/user.module";
import {User} from "../user/entities/user.entity";

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([Card, Role, User]), JwtModule, RolesModule, forwardRef(() => UserModule)]
})
export class CardModule {}
