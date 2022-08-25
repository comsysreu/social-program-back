import { Controller, Get, Post, Body, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { CreateReligionDto } from './dto/create-religion.dto';
import { UpdateReligionDto } from './dto/update-religion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('religion')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) { }

  @Post()
  create(@Body() createReligionDto: CreateReligionDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.religionService.create(createReligionDto, tok);
  }

  @Get()
  findAll(@Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.religionService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.religionService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateReligionDto: UpdateReligionDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.religionService.update(updateReligionDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.religionService.remove(id, tok);
  }
}
