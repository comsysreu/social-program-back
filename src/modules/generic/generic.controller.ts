import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { GenericService } from './generic.service';
import { CreateGenericDto } from './dto/create-generic.dto';
import { UpdateGenericDto } from './dto/update-generic.dto';

@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) { }

  @Post()
  create(@Body() createGenericDto: CreateGenericDto, @Query('validField') validField: string) {
    return this.genericService.create('generic', createGenericDto, 'abc123', validField);
  }

  @Get()
  findAll(@Param('entityName') entity, @Query('page') page,
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
  update(@Body() updateGenericDto: UpdateGenericDto, @Query('validField') validField: string) {
    return this.genericService.update('generic', updateGenericDto, 'abc123', validField);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genericService.remove(id, 'abc123', 'generic', false);
  }
}
