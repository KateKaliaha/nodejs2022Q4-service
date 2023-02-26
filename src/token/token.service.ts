import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJWT, User } from 'src/interfaces';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokens(loginDTO: User) {
    const payload = { userId: loginDTO.id, login: loginDTO.login };
    const tokens = {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: `${process.env.TOKEN_EXPIRE_TIME}`,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: `${process.env.TOKEN_REFRESH_EXPIRE_TIME}`,
      }),
    };

    return tokens;
  }

  async decodeToken(refreshDTO: JwtPayload): Promise<decodeJWT> {
    if (refreshDTO.refreshToken === undefined) {
      throw new HttpException(
        'Body is not contain refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { refreshToken } = refreshDTO;
    try {
      await this.verifyRefreshToken(refreshToken);
      const decodedJwtAccessToken = this.jwtService.decode(
        refreshToken,
      ) as decodeJWT;
      return decodedJwtAccessToken;
    } catch {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
