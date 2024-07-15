import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {PaginationGetAllUsersDto} from "./dto/pagination-get-all-users.dto";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'Getting all users'})
  @ApiResponse({status: 200, type: [User]})
  // @Roles('Admin')
  // @UseGuards(RolesGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationGetAllUsersDto): Promise<User[]> {
    const { page = 1, limit = 10 } = paginationDto;
    return this.userService.findAll(page, limit);
  }

  @ApiOperation({ summary: 'Assigning a role to a user' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('Admin')
  @UseGuards(RolesGuard)

  @Patch('/role')
  public async addRole(@Body() dto: AddRoleDto): Promise<User> {
    return await this.userService.addRole(dto);
  }
}
