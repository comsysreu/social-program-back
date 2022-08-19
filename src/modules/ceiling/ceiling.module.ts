import { Module } from '@nestjs/common';
import { CeilingService } from './ceiling.service';
import { CeilingController } from './ceiling.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [CeilingController],
  providers: [CeilingService],
  imports: [GenericModule]
})
export class CeilingModule {}
