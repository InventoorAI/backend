import { Test, TestingModule } from '@nestjs/testing';
import { Yolov8Service } from './yolov8.service';

describe('Yolov8Service', () => {
  let service: Yolov8Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Yolov8Service],
    }).compile();

    service = module.get<Yolov8Service>(Yolov8Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
