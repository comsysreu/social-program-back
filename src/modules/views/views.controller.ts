import { Controller, Get, Post, Body, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) { }

  @Post()
  create(@Body() createViewDto: CreateViewDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.viewsService.create(createViewDto, tok);
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
  update(@Body() updateViewDto: UpdateViewDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.viewsService.update(updateViewDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.viewsService.remove(id, tok);
  }
}
