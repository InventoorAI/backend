import { Test, TestingModule } from '@nestjs/testing';
import { HexapodsService } from './hexapods.service';

describe('HexapodsService', () => {
  let service: HexapodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HexapodsService],
    }).compile();

    service = module.get<HexapodsService>(HexapodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
