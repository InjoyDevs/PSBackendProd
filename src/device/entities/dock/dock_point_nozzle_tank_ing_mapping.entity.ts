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
import { AdvsMtIngrTankLinking } from 'src/ingredient/entities/advs_mt_ingr_tank_linking.entity'; // Replace with the actual import path

@Entity('dock_point_nozzle_tank_ing_mapping')
export class DockPointNozzleTankIngMapping {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  temp_nozzle_tank_ingr_id!: number;

  @Column()
  dock_point_id!: number;

  @Column()
  nozzle_index!: number;

  @Column()
  tank_ing_mapping_id!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => AdvsMtIngrTankLinking)
  @JoinColumn({ name: 'tank_ing_mapping_id', referencedColumnName: 'id' })
  advsMtIngrTankLinking!: AdvsMtIngrTankLinking;
}
