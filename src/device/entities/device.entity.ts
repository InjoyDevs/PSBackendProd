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
@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  is_in_service: number;

  @Column({ type: 'bigint' })
  template_id: number;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'int' })
  device_type: number;

  @Column({ type: 'int' })
  created_by: number;

  @Column({ type: 'int' })
  modified_by: number;

  @Column({ type: 'text', nullable: true })
  deleted_at: string | null;

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
  inventoryLevel: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'text', nullable: true })
  inventory: any;

  @Column({ type: 'int' })
  inventoryId: number;

  @Column({
    type: 'text', // Store spatial data as text
    nullable: true,
  })
  current_location: string;

  @Column({ type: 'int' })
  security_alert_level: number;

  @ManyToOne(() => SysCatConfig, (sysCatConfig) => sysCatConfig.id)
  @JoinColumn({ name: 'device_type', referencedColumnName: 'id' })
  sysCatConfig: SysCatConfig;

  @OneToMany(
    () => AdvsMvPartsLink,
    (advsMvPartsLink) => advsMvPartsLink.device_id,
  )
  advsMvPartsLinks: AdvsMvPartsLink[];
}
