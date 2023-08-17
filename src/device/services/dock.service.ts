import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvsMvDeviceIoDock } from '../entities/dock/advs_mv_device_io_dock.entity';
import { AdvsMvIoDockPartsLink } from '../entities/dock/advs_mv_io_dock_parts_link.entity';
import { DockPointNozzleTankIngMapping } from '../entities/dock/dock_point_nozzle_tank_ing_mapping.entity';

@Injectable()
export class DockService {
  constructor(
    @InjectRepository(AdvsMvDeviceIoDock)
    private advsMvDeviceIoDockRepository: Repository<AdvsMvDeviceIoDock>,
    @InjectRepository(AdvsMvIoDockPartsLink)
    private advsMvIoDockPartsLinkRepository: Repository<AdvsMvIoDockPartsLink>,
    @InjectRepository(DockPointNozzleTankIngMapping)
    private dockPointNozzleTankIngMappingRepository: Repository<DockPointNozzleTankIngMapping>,
  ) {}
}
