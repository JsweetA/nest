import { Test, TestingModule } from '@nestjs/testing';
import { BridController } from './brid.controller';

describe('MqttController', () => {
  let controller: BridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BridController],
    }).compile();

    controller = module.get<BridController>(BridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
