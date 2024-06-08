import { Test, TestingModule } from '@nestjs/testing';
import { MoversController } from './movers.controller';
import { MoversService } from './movers.service';

describe('MoversController', () => {
  let controller: MoversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoversController],
      providers: [MoversService],
    }).compile();

    controller = module.get<MoversController>(MoversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
