import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {Card} from "../card/entities/card.entity";
import {Roles} from "../roles/enums/roles.enum";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Card) private cardRepository: Repository<Card>,
              private roleService: RolesService,
              ) {}
  async create(createUserDto: CreateUserDto):Promise<User> {

    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue(Roles.Admin);
    user.role = role;

    await this.userRepository.save(user);
    return user;
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const [results, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return results;
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOne({where: {email}})
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    const role = await this.roleService.getRoleByValue(dto.value);

    if(role && user){
      user.role = role;
      await this.userRepository.save(user);
      return user;
    }

    throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND);

  }

  async getUserById(id: string) {
    return await this.userRepository.findOneBy({id})
  }
}
