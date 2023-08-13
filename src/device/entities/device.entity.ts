import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SysCatConfig } from './sys_cat_config.entity';
import { AdvsMvPartsLink } from './part/advsMvPartsLink.entity';

// enum DeviceLevel {
//   LEVEL_1 = 'Level 1',
//   LEVEL_2 = 'Level 2',
//   // Add more levels as needed
// }

// enum DeviceType {
//   TYPE_1 = 'Type 1',
//   TYPE_2 = 'Type 2',
//   // Add more types as needed
// }

@Entity('advs_mg_devices')
export class AdvsMgDevices {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'boolean' })
  is_in_service: boolean;

  @Column({ type: 'bigint' })
  template_id: string;

  @Column({ type: 'int' })
  version: string;

  @Column({
    type: 'int',
  })
  level: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'json' })
  pumpData: object;

  @Column({ type: 'json' })
  dockDetails: object;

  @Column({ type: 'text' })
  digitalSignature: string;

  @Column({ type: 'int' })
  inventoryLevel: string;

  @Column({ type: 'int' })
  capacity: string;

  @Column({ type: 'text', nullable: true })
  inventory: any;

  @Column({ type: 'int' })
  inventoryId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  current_location: string;

  @Column({ type: 'int' })
  security_alert_level: string;

  @ManyToOne(() => SysCatConfig, (sysCatConfig) => sysCatConfig.id)
  @JoinColumn({ name: 'device_type', referencedColumnName: 'id' })
  sysCatConfig: SysCatConfig;
  @Column({ type: 'int' })
  created_by: string;

  @Column({ type: 'int' })
  modified_by: string;

  @Column({ type: 'datetime', nullable: true })
  deleted_at: string;

  @Column({ type: 'datetime' })
  created_at: string;

  @Column({ type: 'datetime' })
  updated_at: string;

  @OneToMany(
    () => AdvsMvPartsLink,
    (advsMvPartsLink) => advsMvPartsLink.device_id,
  )
  advsMvPartsLinks: AdvsMvPartsLink[];
}
