import { Test, TestingModule } from '@nestjs/testing';
import { BridService } from './brid.service';

describe('MqttService', () => {
  let service: BridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BridService],
    }).compile();

    service = module.get<BridService>(BridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
