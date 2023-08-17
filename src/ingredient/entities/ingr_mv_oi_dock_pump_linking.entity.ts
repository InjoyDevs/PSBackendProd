import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdvsMtIngrTankLinking } from './advs_mt_ingr_tank_linking.entity';

@Entity('ingr_mv_oi_dock_pump_linking')
export class IngrMvOiDockPumpLinking {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  temp_nozzle_pump_id!: number;

  @Column()
  dock_point_id!: number;

  @Column()
  tank_ing_mapping_id!: number;

  @Column()
  pump_id!: number;

  @Column()
  pump_index!: number;

  @Column()
  nozzle_index!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => AdvsMtIngrTankLinking)
  @JoinColumn({ name: 'tank_ing_mapping_id', referencedColumnName: 'id' })
  tank_linking!: AdvsMtIngrTankLinking;
}
