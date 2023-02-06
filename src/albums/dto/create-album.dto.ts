import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString()
  readonly artistId: string;
}
