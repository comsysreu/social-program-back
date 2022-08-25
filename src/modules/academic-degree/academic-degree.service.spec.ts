import { Test, TestingModule } from '@nestjs/testing';
import { AcademicDegreeService } from './academic-degree.service';

describe('AcademicDegreeService', () => {
  let service: AcademicDegreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicDegreeService],
    }).compile();

    service = module.get<AcademicDegreeService>(AcademicDegreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
