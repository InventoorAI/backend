import { Test, TestingModule } from '@nestjs/testing';
import { WebcamsService } from './webcams.service';

describe('WebcamService', () => {
  let service: WebcamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebcamsService],
    }).compile();

    service = module.get<WebcamsService>(WebcamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
