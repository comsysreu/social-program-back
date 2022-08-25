import { Module } from '@nestjs/common';
import { HousingMaterialService } from './housing-material.service';
import { HousingMaterialController } from './housing-material.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [HousingMaterialController],
  providers: [HousingMaterialService],
  imports: [GenericModule]
})
export class HousingMaterialModule {}
