import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService], 
  imports: [GenericModule]
})
export class MedicineModule {}
