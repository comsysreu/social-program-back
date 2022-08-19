import { Module } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { GroceriesController } from './groceries.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [GroceriesController],
  providers: [GroceriesService], 
  imports: [GenericModule]
})
export class GroceriesModule {}
