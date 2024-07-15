import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Role} from "./entities/role.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  exports: [RolesService]
})
export class RolesModule {}
