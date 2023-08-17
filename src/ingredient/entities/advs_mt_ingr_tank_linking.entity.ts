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
import { AprtMgPartDigitalId } from '../../device/entities/part/aprt_mg_part_digital_id.entity'; // Replace with the actual import path
import { IngrMgIngredients } from './ingredient.entity'; // Replace with the actual import path

@Entity('advs_mt_ingr_tank_linking')
export class AdvsMtIngrTankLinking {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  device_id!: number;

  @Column()
  ing_id!: number;

  @Column()
  tank_id!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => AprtMgPartDigitalId)
  @JoinColumn({ name: 'tank_id', referencedColumnName: 'id' })
  tank!: AprtMgPartDigitalId;

  @ManyToOne(() => IngrMgIngredients)
  @JoinColumn({ name: 'ing_id', referencedColumnName: 'id' })
  ingredient!: IngrMgIngredients;
}
