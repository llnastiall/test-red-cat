import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {CardModule} from "../card/card.module";
import {Card} from "../card/entities/card.entity";
import {Role} from "../roles/entities/role.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Role, Card]),
      RolesModule,
      forwardRef(() => AuthModule),
      forwardRef(() => CardModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
