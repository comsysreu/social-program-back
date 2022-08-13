import { Module } from '@nestjs/common';
import { GenericService } from './generic.service';
import { GenericController } from './generic.controller';
import { ConnectionModule } from '../connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [GenericController],
  providers: [GenericService],
  exports: [GenericService]
})
export class GenericModule {}
