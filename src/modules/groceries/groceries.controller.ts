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
  UseGuards,
} from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('groceries')
export class GroceriesController {
  constructor(private readonly groceriesService: GroceriesService) {}

  @Post()
  create(@Body() createGroceryDto: CreateGroceryDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.groceriesService.create(createGroceryDto, tok);
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
    return this.groceriesService.findAll(
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
    return this.groceriesService.findOne(id);
  }

  @Put()
  update(@Body() updateGroceryDto: UpdateGroceryDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.groceriesService.update(updateGroceryDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.groceriesService.remove(id, tok);
  }
}
