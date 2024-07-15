import {Body, Controller, Post, UseGuards, UsePipes} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login users' })
  @ApiResponse({ status: 200 })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Registration users' })
  @ApiResponse({ status: 201 })
  @Post('registration')
  public async register(@Body() registerUserDto: CreateUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
