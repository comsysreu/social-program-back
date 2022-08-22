import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateCeilingDto } from './dto/create-ceiling.dto';
import { UpdateCeilingDto } from './dto/update-ceiling.dto';


@Injectable()
export class CeilingService {

  entity = 'ceiling';
  entityGroceries = 'groceries';
  entityMedicine = 'medicine';

  constructor(
    private generic: GenericService
  ) {
  }

  async create(createCeilingDto: CreateCeilingDto, token: string) {

    console.log(Object.keys(createCeilingDto), Object.keys(CreateCeilingDto));

    const dpi = createCeilingDto.dpi;

    if (!dpi) {
      throw new HttpException(`El campo DPI es requerido para continuar.`, HttpStatus.BAD_REQUEST);
    }

    await this.generic.validProgram(dpi, this.entityMedicine, 'Medicina');
    await this.generic.validProgram(dpi, this.entityGroceries, 'Víveres');

    return this.generic.create(this.entity, createCeilingDto, token, 'dpi');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateCeilingDto: UpdateCeilingDto, token) {
    return this.generic.update(this.entity, updateCeilingDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
