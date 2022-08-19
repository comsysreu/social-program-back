import { Controller, Get, Post, Body, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.usersService.create(createUserDto, tok);
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
  logout(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.usersService.logout(id, tok);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.usersService.update(updateUserDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.usersService.remove(id, tok);
  }
}
