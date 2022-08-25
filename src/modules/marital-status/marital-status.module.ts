import { Module } from '@nestjs/common';
import { MaritalStatusService } from './marital-status.service';
import { MaritalStatusController } from './marital-status.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [MaritalStatusController],
  providers: [MaritalStatusService],
  imports: [GenericModule]
})
export class MaritalStatusModule {}
