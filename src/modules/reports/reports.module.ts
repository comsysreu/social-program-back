import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [GenericModule]
})
export class ReportsModule {}
