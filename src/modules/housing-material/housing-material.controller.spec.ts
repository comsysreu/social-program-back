import { Test, TestingModule } from '@nestjs/testing';
import { HousingMaterialController } from './housing-material.controller';
import { HousingMaterialService } from './housing-material.service';

describe('HousingMaterialController', () => {
  let controller: HousingMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousingMaterialController],
      providers: [HousingMaterialService],
    }).compile();

    controller = module.get<HousingMaterialController>(HousingMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
