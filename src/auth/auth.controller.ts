import { Body, Controller, Post } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { Public } from 'src/guards/jwt-guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUsers(dto);
  }
  @Public()
  @Post('login')
  login(@Body() dto: UserLoginDto) {
    return this.authService.loginUser(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: JwtPayload) {
    return this.authService.refreshTokens(dto);
  }
}
