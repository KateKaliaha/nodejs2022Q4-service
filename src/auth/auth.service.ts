import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUsers(userDTO: CreateUserDto) {
    return this.userService.create(userDTO);
  }

  async loginUser(loginDTO: UserLoginDto) {
    const user = await this.userService.getByLogin(loginDTO.login);
    if (!user) {
      throw new HttpException('Wrong login or email', HttpStatus.FORBIDDEN);
    }
    const isValidatePassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!isValidatePassword) {
      throw new HttpException('Wrong login or email', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
