import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly artistId: string;

  @IsOptional()
  @IsString()
  readonly albumId: string;

  @IsNumber()
  readonly duration: number;
}
