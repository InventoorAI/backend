import { Test, TestingModule } from '@nestjs/testing';
import { WebcamsController } from './webcams.controller';

describe('WebcamController', () => {
  let controller: WebcamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebcamsController],
    }).compile();

    controller = module.get<WebcamsController>(WebcamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
