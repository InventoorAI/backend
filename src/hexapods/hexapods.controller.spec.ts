import { Test, TestingModule } from '@nestjs/testing';
import { HexapodsController } from './hexapods.controller';
import { HexapodsService } from './hexapods.service';

describe('HexapodsController', () => {
  let controller: HexapodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HexapodsController],
      providers: [HexapodsService],
    }).compile();

    controller = module.get<HexapodsController>(HexapodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
