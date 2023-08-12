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

enum DeviceLevel {
  LEVEL_1 = 'Level 1',
  LEVEL_2 = 'Level 2',
  // Add more levels as needed
}

enum DeviceType {
  TYPE_1 = 'Type 1',
  TYPE_2 = 'Type 2',
  // Add more types as needed
}

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'boolean' })
  is_in_service: boolean;

  @Column({ type: 'bigint' })
  template_id: string;

  @Column({ type: 'uuid' })
  version: string;

  @Column({
    type: 'enum',
    enum: DeviceLevel,
    default: DeviceLevel.LEVEL_1,
  })
  level: DeviceLevel;

  @Column({
    type: 'enum',
    enum: DeviceType,
    default: DeviceType.TYPE_1,
  })
  device_type: DeviceType;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid' })
  modified_by: string;

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

  @Column({ type: 'uuid' })
  inventoryLevel: string;

  @Column({ type: 'uuid' })
  capacity: string;

  @Column({ type: 'text', nullable: true })
  inventory: any;

  @Column({ type: 'uuid' })
  inventoryId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  current_location: string;

  @Column({ type: 'uuid' })
  security_alert_level: string;

  @ManyToOne(() => SysCatConfig, (sysCatConfig) => sysCatConfig.id)
  @JoinColumn({ name: 'device_type', referencedColumnName: 'id' })
  sysCatConfig: SysCatConfig;

  @OneToMany(
    () => AdvsMvPartsLink,
    (advsMvPartsLink) => advsMvPartsLink.device_id,
  )
  advsMvPartsLinks: AdvsMvPartsLink[];
}
