import { Controller, Get, Post, Body, Put, Param, Delete, Headers, Query, SerializeOptions, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CeilingService } from './ceiling.service';
import { CreateCeilingDto } from './dto/create-ceiling.dto';
import { UpdateCeilingDto } from './dto/update-ceiling.dto';

@Controller('ceiling')
export class CeilingController {
  constructor(private readonly ceilingService: CeilingService) { }

  // @SerializeOptions({
  //   excludePrefixes: ['_'],
  // })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createCeilingDto: CreateCeilingDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.ceilingService.create(createCeilingDto, tok);
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.ceilingService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ceilingService.findOne(id);
  }
  
  @Put()
  update(@Body() updateCeilingDto: UpdateCeilingDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.ceilingService.update(updateCeilingDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.ceilingService.remove(id, tok);
  }
}
