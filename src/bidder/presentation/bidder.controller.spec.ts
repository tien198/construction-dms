import { Test, TestingModule } from '@nestjs/testing';
import { BidderController } from './bidder.controller';
import { BidderService } from '../application/bidder.service';

describe('BidderController', () => {
  let controller: BidderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidderController],
      providers: [BidderService],
    }).compile();

    controller = module.get<BidderController>(BidderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
