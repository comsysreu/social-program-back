import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [GenericModule]
})
export class UsersModule {}
