import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService], 
  imports: [GenericModule]
})
export class ProfilesModule {}
