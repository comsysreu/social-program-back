import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

@Injectable()
export class GroceriesService {

  entity = 'groceries';

  constructor(
    private generic: GenericService
  ) {
  }
  
  create(createGroceryDto: CreateGroceryDto, token: string) {
    return this.generic.create(this.entity, createGroceryDto, token, 'dpi');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateGroceryDto: UpdateGroceryDto, token) {
    return this.generic.update(this.entity, updateGroceryDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
