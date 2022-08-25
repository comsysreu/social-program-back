import { Controller, Get, Post, Body, Param, Delete, Query, Headers, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@UseGuards(JwtAuthGuard)
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) { }

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.communityService.create(createCommunityDto, tok);
  }

  @Get()
  findAll(@Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.communityService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(id);
  }

  @Put()
  update(@Body() updateCommunityDto: UpdateCommunityDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.communityService.update(updateCommunityDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.communityService.remove(id, tok);
  }
}
