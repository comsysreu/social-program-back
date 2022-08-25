import { Controller, Get, Post, Body, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { MaritalStatusService } from './marital-status.service';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { UpdateMaritalStatusDto } from './dto/update-marital-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('marital-status')
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) { }

  @Post()
  create(@Body() createMaritalStatusDto: CreateMaritalStatusDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.maritalStatusService.create(createMaritalStatusDto, tok);
  }

  @Get()
  findAll(@Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.maritalStatusService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maritalStatusService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateMaritalStatusDto: UpdateMaritalStatusDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.maritalStatusService.update(updateMaritalStatusDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.maritalStatusService.remove(id, tok);
  }
}
