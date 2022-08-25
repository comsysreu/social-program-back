import { Module } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { ReligionController } from './religion.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [ReligionController],
  providers: [ReligionService],
  imports: [GenericModule]
})
export class ReligionModule {}
