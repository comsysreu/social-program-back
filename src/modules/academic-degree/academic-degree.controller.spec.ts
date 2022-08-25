import { Test, TestingModule } from '@nestjs/testing';
import { AcademicDegreeController } from './academic-degree.controller';
import { AcademicDegreeService } from './academic-degree.service';

describe('AcademicDegreeController', () => {
  let controller: AcademicDegreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicDegreeController],
      providers: [AcademicDegreeService],
    }).compile();

    controller = module.get<AcademicDegreeController>(AcademicDegreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
