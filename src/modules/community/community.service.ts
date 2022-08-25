import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunityService {

  entity = 'community';

  constructor(
    private generic: GenericService
  ) {
  }

  create(createCommunityDto: CreateCommunityDto, token: string) {
    return this.generic.create(this.entity, createCommunityDto, token, 'name');
  }

  findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateCommunityDto: UpdateCommunityDto, token) {
    return this.generic.update(this.entity, updateCommunityDto, token, 'dpi');
  }

  remove(id: string, token) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
