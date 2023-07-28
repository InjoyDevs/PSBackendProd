import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pump } from './entities/pump.entity';

@Injectable()
export class PumpService {
  constructor(
    @InjectRepository(Pump)
    private pumpRepository: Repository<Pump>,
  ) {}

  async createPump(pump: Pump): Promise<Pump> {
    return await this.pumpRepository.save(pump);
  }
}
