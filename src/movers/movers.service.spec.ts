import { Test, TestingModule } from '@nestjs/testing';
import { MoversService } from './movers.service';

describe('MoversService', () => {
  let service: MoversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoversService],
    }).compile();

    service = module.get<MoversService>(MoversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
