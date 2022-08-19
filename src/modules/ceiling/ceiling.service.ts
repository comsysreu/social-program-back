import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateCeilingDto } from './dto/create-ceiling.dto';
import { UpdateCeilingDto } from './dto/update-ceiling.dto';


@Injectable()
export class CeilingService {

  entity = 'ceiling';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createCeilingDto: CreateCeilingDto, token: string) {
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
