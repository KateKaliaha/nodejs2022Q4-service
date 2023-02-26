import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/guards/jwt-guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUsers(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDto) {
    return this.authService.loginUser(dto);
  }
}
