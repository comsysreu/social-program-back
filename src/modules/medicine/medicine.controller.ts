import { Controller, Get, Post, Body, Put, Param, Delete, Headers, Query, UseGuards } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) { }

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.medicineService.create(createMedicineDto, tok);
  }

  @Get()
  findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number) {
    return this.medicineService.findAll(page, limit, filter, sort, sortDirection, onlyCount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(id);
  }

  @Put()
  update(@Body() updateMedicineDto: UpdateMedicineDto, @Headers() headers) {
    const tok = headers.authorization;
    return this.medicineService.update(updateMedicineDto, tok);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers) {
    const tok = headers.authorization;
    return this.medicineService.remove(id, tok);
  }
}
