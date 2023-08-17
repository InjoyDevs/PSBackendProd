import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SysCatConfig } from './sys_cat_config.entity';
import { AdvsMvPartsLink } from './part/advs_mv_parts_link.entity';

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

  @Column({
    type: 'text',
    nullable: true,
  })
  current_location: string;

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
