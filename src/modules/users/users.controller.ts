import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, 'abc123');
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.usersService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('logout/:id')
  logout(@Param('id') id: string) {
    return this.usersService.logout(id, 'abc123');
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto, 'abc123');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id, 'abc123');
  }
}
