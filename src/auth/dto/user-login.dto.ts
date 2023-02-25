import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
