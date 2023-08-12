import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SysCatConfig } from './SysCatConfig.entity';
import { AdvsMvPartsLink } from './advsMvPartsLink.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  is_in_service: UUID;

  @Column({ type: 'bigint' })
  template_id: UUID;

  @Column({ type: 'int' })
  version: UUID;

  @Column({ type: 'int' })
  level: UUID;

  @Column({ type: 'int' })
  device_type: UUID;

  @Column({ type: 'int' })
  created_by: UUID;

  @Column({ type: 'int' })
  modified_by: UUID;

  @Column({ type: 'text', nullable: true })
  deleted_at: string;

  @Column({ type: 'text' })
  created_at: string;

  @Column({ type: 'text' })
  updated_at: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'json' })
  pumpData: object;

  @Column({ type: 'json' })
  dockDetails: object;

  @Column({ type: 'text' })
  digitalSignature: string;

  @Column({ type: 'int' })
  inventoryLevel: UUID;

  @Column({ type: 'int' })
  capacity: UUID;

  @Column({ type: 'text', nullable: true })
  inventory: any;

  @Column({ type: 'int' })
  inventoryId: UUID;

  @Column({
    type: 'text', // Store spatial data as text
    nullable: true,
  })
  current_location: string;

  @Column({ type: 'int' })
  security_alert_level: UUID;

  @ManyToOne(() => SysCatConfig, (sysCatConfig) => sysCatConfig.id)
  @JoinColumn({ name: 'device_type', referencedColumnName: 'id' })
  sysCatConfig: SysCatConfig;

  @OneToMany(
    () => AdvsMvPartsLink,
    (advsMvPartsLink) => advsMvPartsLink.device_id,
  )
  advsMvPartsLinks: AdvsMvPartsLink[];
}
