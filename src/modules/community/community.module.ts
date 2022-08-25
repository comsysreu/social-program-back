import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService], 
  imports: [GenericModule]
})
export class CommunityModule {}
