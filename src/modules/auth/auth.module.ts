import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GenericModule } from '../generic/generic.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [GenericModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),]
})
export class AuthModule { }
