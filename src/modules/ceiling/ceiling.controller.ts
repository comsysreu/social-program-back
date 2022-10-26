import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CeilingService } from './ceiling.service';
import { CreateCeilingDto } from './dto/create-ceiling.dto';
import { UpdateCeilingDto } from './dto/update-ceiling.dto';

@UseGuards(JwtAuthGuard)
@Controller('ceiling')
export class CeilingController {
  constructor(private readonly ceilingService: CeilingService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createCeilingDto: CreateCeilingDto,
    @Headers() headers,
    @Query('next') next,
  ) {
    const tok = headers.authorization;
    return this.ceilingService.create(createCeilingDto, tok, next);
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
    return this.ceilingService.findAll(
      page,
      limit,
      filter,
      sort,
      sortDirection,
      onlyCount,
    );
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
