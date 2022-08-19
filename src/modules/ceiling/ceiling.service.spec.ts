import { Test, TestingModule } from '@nestjs/testing';
import { CeilingService } from './ceiling.service';

describe('CeilingService', () => {
  let service: CeilingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CeilingService],
    }).compile();

    service = module.get<CeilingService>(CeilingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
