import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateReligionDto } from './dto/create-religion.dto';
import { UpdateReligionDto } from './dto/update-religion.dto';

@Injectable()
export class ReligionService {
  entity = 'religion';

  constructor(private generic: GenericService) {}

  create(createReligionDto: CreateReligionDto, token: string) {
    return this.generic.create(this.entity, createReligionDto, token, 'name');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(
      this.entity,
      page,
      limit,
      filter,
      sort,
      sortDirection,
      onlyCount,
    );
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateReligionDto: UpdateReligionDto, token) {
    return this.generic.update(this.entity, updateReligionDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
