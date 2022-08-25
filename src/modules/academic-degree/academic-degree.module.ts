import { Module } from '@nestjs/common';
import { AcademicDegreeService } from './academic-degree.service';
import { AcademicDegreeController } from './academic-degree.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [AcademicDegreeController],
  providers: [AcademicDegreeService], 
  imports: [GenericModule]
})
export class AcademicDegreeModule {}
