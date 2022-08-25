import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { UpdateMaritalStatusDto } from './dto/update-marital-status.dto';

@Injectable()
export class MaritalStatusService {

  entity = 'marital_status';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createMaritalStatusDto: CreateMaritalStatusDto, token: string) {
    return this.generic.create(this.entity, createMaritalStatusDto, token, 'name');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateMaritalStatusDto: UpdateMaritalStatusDto, token) {
    return this.generic.update(this.entity, updateMaritalStatusDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
