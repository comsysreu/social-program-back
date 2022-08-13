import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { GenericService } from '../generic/generic.service';

@Injectable()
export class ViewsService {

  entity = 'views';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createViewDto: CreateViewDto, token: string) {
    return this.generic.create(this.entity, createViewDto, token, 'identifier');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateViewDto: UpdateViewDto, token) {
    return this.generic.update(this.entity, updateViewDto, token, 'identifier');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }

}
