import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.delete(id);
  }
}
