import { Controller, Get, Post, Body, Param, Delete, Headers, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AcademicDegreeService } from './academic-degree.service';
import { CreateAcademicDegreeDto } from './dto/create-academic-degree.dto';
import { UpdateAcademicDegreeDto } from './dto/update-academic-degree.dto';

@UseGuards(JwtAuthGuard)
@Controller('academic-degree')
export class AcademicDegreeController {
  constructor(private readonly academicDegreeService: AcademicDegreeService) { }

  @Post()
  create(@Body() createAcademicDegreeDto: CreateAcademicDegreeDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.academicDegreeService.create(createAcademicDegreeDto, tok);
  }

  @Get()
  findAll(@Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.academicDegreeService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicDegreeService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateAcademicDegreeDto: UpdateAcademicDegreeDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.academicDegreeService.update(updateAcademicDegreeDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.academicDegreeService.remove(id, tok);
  }
}
