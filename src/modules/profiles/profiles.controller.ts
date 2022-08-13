import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto, '123abc');
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.profilesService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Put()
  update(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(updateProfileDto, '123abc');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id, '123abc');
  }
}
