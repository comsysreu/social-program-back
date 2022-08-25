import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateHousingMaterialDto } from './dto/create-housing-material.dto';
import { UpdateHousingMaterialDto } from './dto/update-housing-material.dto';

@Injectable()
export class HousingMaterialService {

  entity = 'housing_material';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createHousingMaterialDto: CreateHousingMaterialDto, token: string) {
    return this.generic.create(this.entity, createHousingMaterialDto, token, 'name');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateHousingMaterialDto: UpdateHousingMaterialDto, token) {
    return this.generic.update(this.entity, updateHousingMaterialDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
