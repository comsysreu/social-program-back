import { Controller, Get, Post, Body, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { GenericService } from './generic.service';
import { CreateGenericDto } from './dto/create-generic.dto';
import { UpdateGenericDto } from './dto/update-generic.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) { }

  @Post()
  create(@Body() createGenericDto: CreateGenericDto, @Query('validField') validField: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.genericService.create('generic', createGenericDto, tok, validField);
  }

  @Get()
  findAll(@Query('entity') entity, @Query('page') page,
    @Query('limit') limit, @Query('filter') filter,
    @Query('onlyCount') onlyCount: boolean, @Query('sort') sort: string,
    @Query('sortDirection') sortDirection: number) {
    return this.genericService.findAll(entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('entityName') entity: string) {
    return this.genericService.findOne(id, entity);
  }

  @Put(':id')
  update(@Body() updateGenericDto: UpdateGenericDto, @Query('validField') validField: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.genericService.update('generic', updateGenericDto, tok, validField);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.genericService.remove(id, tok, 'generic', false);
  }
}
