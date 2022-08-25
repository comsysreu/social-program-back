import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateAcademicDegreeDto } from './dto/create-academic-degree.dto';
import { UpdateAcademicDegreeDto } from './dto/update-academic-degree.dto';

@Injectable()
export class AcademicDegreeService {

  entity = 'academic_degree';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createAcademicDegreeDto: CreateAcademicDegreeDto, token: string) {
    return this.generic.create(this.entity, createAcademicDegreeDto, token, 'name');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateAcademicDegreeDto: UpdateAcademicDegreeDto, token) {
    return this.generic.update(this.entity, updateAcademicDegreeDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
