import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.profilesService.create(createProfileDto, tok);
  }

  @Post('permissions')
  createPerm(@Body() createProfileDto: CreateProfileDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.profilesService.createPerm(createProfileDto, tok);
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number,
  ) {
    return this.profilesService.findAll(
      page,
      limit,
      filter,
      sort,
      sortDirection,
      onlyCount,
    );
  }

  @Get('permissions/:externalId')
  findPermissions(@Param('externalId') id: string) {
    return this.profilesService.findPermissions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Put()
  update(@Body() updateProfileDto: UpdateProfileDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.profilesService.update(updateProfileDto, tok);
  }

  @Put('permissions')
  updatePerm(@Body() updateProfileDto: UpdateProfileDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.profilesService.updatePerm(updateProfileDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.profilesService.remove(id, tok);
  }
}
