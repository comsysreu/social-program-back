import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) { }

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewsService.create(createViewDto, '123abc');
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.viewsService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewsService.findOne(id);
  }

  @Put()
  update(@Body() updateViewDto: UpdateViewDto) {
    return this.viewsService.update(updateViewDto, '123abc');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewsService.remove(id, '123abc');
  }
}
