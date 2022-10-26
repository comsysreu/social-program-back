import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  entity = 'users';

  part1 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNnb21leiIsIl9pZCI6IjVmMmIwODQ4YzhjZmM4OTcyY2FkYTcwNCIsInByb`;
  part2 = `2ZpbGVJZCI6MiwiaWF0IjoxNjAwNzExNDA0LCJleHAiOjE2MDA3OTc4MDR9.G0Efr6ymz1_hw3NGuPtryRWZM2GPcZ5TGrgyn7war1A`;

  constructor(
    private generic: GenericService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const pswd = await this.generic.getHash(pass);
    const user = await this.generic.findByQuery(this.entity, [
      { $match: { $and: [{ statusD: 1 }, { username }] } },
    ]);

    console.log('USER = >', user);

    const token = `Bearer ${this.part1}${this.part2}`;

    if (user.length > 0) {
      if (user[0].status === 0)
        throw new HttpException(
          'Usuario bloqueado temporalmente',
          HttpStatus.BAD_REQUEST,
        );

      if (user[0].password === pswd && user[0].failedAttempts < 5) {
        const { password, ...result } = user[0];
        user[0].failedAttempts = 0;
        user[0].lastLogin = this.generic.setDates({}, 'update');
        await this.generic.update(this.entity, user[0], token, null);
        return result;
      } else {
        if (user[0].failedAttempts > 4) {
          user[0].status = 0;
          await this.generic.update(this.entity, user[0], token, null);
          throw new HttpException(
            'Usuario bloqueado temporalmente',
            HttpStatus.BAD_REQUEST,
          );
        }
        user[0].failedAttempts++;
        await this.generic.update(this.entity, user[0], token, null);
      }
    }
    throw new HttpException(
      'Credenciales Incorrectas',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      _id: user._id,
      profileId: user.profileId,
    };
    return {
      secacc: this.jwtService.sign(payload),
    };
  }
}
