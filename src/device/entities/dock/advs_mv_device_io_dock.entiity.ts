import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { DockPointNozzleTankIngMapping } from './dock_point_nozzle_tank_ing_mapping.entity'; // Replace with the actual import path
import { IngrMvOiDockPumpLinking } from 'src/ingredient/entities/ingr_mv_oi_dock_pump_linking.entity'; // Replace with the actual import path

@Entity('advs_mv_device_io_dock')
export class AdvsMvDeviceIoDock {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  device_id!: number;

  @Column()
  refill_point_category!: number;

  @Column()
  name!: string;

  @Column()
  process_interface_type!: number;

  @DeleteDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at!: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToMany(
    () => DockPointNozzleTankIngMapping,

    (dockPointNozzleTankIngMapping) =>
      dockPointNozzleTankIngMapping.dock_point_id,
  )
  dockPointNozzleTankIngMappings!: DockPointNozzleTankIngMapping[];

  @ManyToMany(
    () => IngrMvOiDockPumpLinking,
    (ingrMvOiDockPumpLinking) => ingrMvOiDockPumpLinking.dock_point_id,
  )
  ingrMvOiDockPumpLinkings!: IngrMvOiDockPumpLinking[];
}
