import { Controller, Get, Post, Body, Param, Delete, Headers, Query, Put, UseGuards } from '@nestjs/common';
import { HousingMaterialService } from './housing-material.service';
import { CreateHousingMaterialDto } from './dto/create-housing-material.dto';
import { UpdateHousingMaterialDto } from './dto/update-housing-material.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('housing-material')
export class HousingMaterialController {
  constructor(private readonly housingMaterialService: HousingMaterialService) { }

  @Post()
  create(@Body() createHousingMaterialDto: CreateHousingMaterialDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.housingMaterialService.create(createHousingMaterialDto, tok);
  }

  @Get()
  findAll(@Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.housingMaterialService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housingMaterialService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateHousingMaterialDto: UpdateHousingMaterialDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.housingMaterialService.update(updateHousingMaterialDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.housingMaterialService.remove(id, tok);
  }
}
