import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Getting role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get(':value')
  public async getByValue(@Param('value') value: string): Promise<Role> {
    return await this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Creating role' })
  @ApiResponse({ status: 201, type: Role })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(createRoleDto);
  }
}
