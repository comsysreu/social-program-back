import { Test, TestingModule } from '@nestjs/testing';
import { CeilingController } from './ceiling.controller';
import { CeilingService } from './ceiling.service';

describe('CeilingController', () => {
  let controller: CeilingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CeilingController],
      providers: [CeilingService],
    }).compile();

    controller = module.get<CeilingController>(CeilingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
