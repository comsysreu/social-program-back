import { Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {

  entity = 'profiles';
  entityPerm = 'profile_permissions';

  constructor(private generic: GenericService) {
  }

  create(createProfileDto: CreateProfileDto, token: string) {
    return this.generic.create(this.entity, createProfileDto, token, 'externalId');
  }

  createPerm(createProfileDto: CreateProfileDto, token: string) {
    return this.generic.create(this.entityPerm, createProfileDto, token, null);
  }

  findAll(page, limit, filter: string, sort, sortDirection, onlyCount: boolean) {
    return this.generic.findAll(this.entity, page, limit, filter, sort, sortDirection, onlyCount);
  }

  findOne(id: string) {
    return this.generic.findOne(id, this.entity);
  }

  async findPermissions(id: string) {

    const total = await this.generic.findAll(this.entityPerm, 1, 10, id, null, null, true);

    console.log('TOTAL....: FROM PERMISSIONS ', total);

    const all = total.count > 0 ? total.count : 1;

    return this.generic.findAll(this.entityPerm, 1, all, id, null, null, null);
  }

  update(updateProfileDto: UpdateProfileDto, token: string) {
    return this.generic.update(this.entity, updateProfileDto, token, 'externalId');
  }

  updatePerm(updateProfileDto: UpdateProfileDto, token: string) {
    return this.generic.update(this.entityPerm, updateProfileDto, token, null);
  }

  remove(id: string, token: string) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
