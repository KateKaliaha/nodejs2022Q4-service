import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokens(loginDTO: User) {
    const payload = { userId: loginDTO.id, login: loginDTO.login };

    const tokens = {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };

    return tokens;
  }
}
