import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {

  entity = 'medicine';
  entityCeiling = 'ceiling';
  entityGroceries = 'groceries';

  constructor(
    private generic: GenericService
  ) {
  }

  async create(createMedicineDto: CreateMedicineDto, token: string) {

    const dpi = createMedicineDto.dpi;
    if (!dpi) {
      throw new HttpException(`El campo DPI es requerido para continuar.`, HttpStatus.BAD_REQUEST);
    }

    await this.generic.validProgram(dpi, this.entityCeiling, 'Techo Mínimo');
    await this.generic.validProgram(dpi, this.entityGroceries, 'Víveres');

    return this.generic.create(this.entity, createMedicineDto, token, 'dpi');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateMedicineDto: UpdateMedicineDto, token) {
    return this.generic.update(this.entity, updateMedicineDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
