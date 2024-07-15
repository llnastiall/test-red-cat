import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "../user/dto/login-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }
    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto);
        return this.generateToken(user);
    }

    async register(registerUserDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(registerUserDto.email);
        if(candidate){
            throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
        const user = await this.userService.create({...registerUserDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, role: user.role};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(loginUserDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(loginUserDto.email);
        const passwordEquals = await bcrypt.compare(loginUserDto.password, user.password);

        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Wrong password or email'});
    }
}
