import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {

  entity = 'profiles';

  constructor(private generic: GenericService) {
  }

  create(createProfileDto: CreateProfileDto, token: string) {
    return this.generic.create(this.entity, createProfileDto, token, 'externalId');
  }

  findAll(page, limit, filter: string, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  update(updateProfileDto: UpdateProfileDto, token: string) {
    return this.generic.update(this.entity, updateProfileDto, token, 'externalId');
  }

  remove(id: string, token: string) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
