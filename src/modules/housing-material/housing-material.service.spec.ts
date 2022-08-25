import { Test, TestingModule } from '@nestjs/testing';
import { HousingMaterialService } from './housing-material.service';

describe('HousingMaterialService', () => {
  let service: HousingMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousingMaterialService],
    }).compile();

    service = module.get<HousingMaterialService>(HousingMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
