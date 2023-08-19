import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DockEncryption } from './entities/dock/dock_encrpytion.primary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DockService {
  constructor(
    @InjectRepository(DockEncryption)
    private dockEncryptionRepository: Repository<DockEncryption>,
  ) {}
  getDock(dockId: number) {
    return this.dockEncryptionRepository.findOne({
      where: {
        dock_point_id: dockId,
      },
    });
  }
  async updateDock(dockId: number, publicKey: string) {
    const dock = await this.dockEncryptionRepository.findOne({
      where: {
        dock_point_id: dockId,
      },
    });
    if (!dock) {
      throw new NotFoundException(`Dock with id ${dockId} not found`);
    }
    dock.public_key = publicKey;
    await this.dockEncryptionRepository.save(dock);
    return dock;
  }
}
