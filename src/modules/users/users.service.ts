import { HttpStatus, Injectable } from '@nestjs/common';
import { CommonUtils } from 'src/utils/common.utils';
import { GenericService } from '../generic/generic.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  entity = 'users';

  constructor(private generic: GenericService) {}

  async create(createUserDto: CreateUserDto, token) {
    createUserDto.changePass = 1;
    createUserDto.failedAttempts = 0;
    createUserDto.password = await this.generic.getHash('Muni2022');

    return this.generic.create(this.entity, createUserDto, token, 'username');
  }

  async perms(token) {
    const username = CommonUtils.getValuesTok(token, 'username');

    console.log('INFO TOKEN PERMS ===>', username);

    const queryEnd = [
      {
        $match: { statusD: 1, username },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profileId',
          foreignField: 'externalId',
          as: 'profile',
        },
      },
      {
        $unwind: {
          path: '$profile',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: { $and: [{ 'profile.statusD': 1 }] },
      },
      {
        $lookup: {
          from: 'profile_permissions',
          let: {
            externalId: '$profileId',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$profileId', '$$externalId'] } } },
            {
              $lookup: {
                from: 'views',
                let: { viewId: { $toObjectId: '$viewId' } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$viewId'] } } },
                ],
                as: 'view',
              },
            },
            { $unwind: '$view' },
          ],
          as: 'permissions',
        },
      },
    ];

    const dbModel = await this.generic.getConnection(this.entity);

    return dbModel.aggregate(queryEnd).catch((err) => {
      throw err;
    });
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

  async logout(id: string, token: string) {
    const user = await this.generic.findOne(id, this.entity);

    user._doc.login = 0;

    await this.generic.update(this.entity, user, token, null);

    return HttpStatus.OK;
  }

  update(updateUserDto: UpdateUserDto, token) {
    return this.generic.update(this.entity, updateUserDto, token, 'username');
  }

  remove(id: string, token: string) {
    return this.generic.remove(id, token, this.entity, false);
  }
}
