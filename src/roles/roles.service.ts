import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return role;
  }

  async getRoleByValue(value: string):Promise<Role> {
    const role = await this.roleRepository.findOne({where: {value}})
    return role;
  }
}
