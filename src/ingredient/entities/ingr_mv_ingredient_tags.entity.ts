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
import { IngrMgIngredients } from './ingredient.entity'; // Replace with the actual import path
import { SysCatConfig } from '../../device/entities/sys_cat_config.entity'; // Replace with the actual import path

@Entity('ingr_mv_ingredient_tags')
export class IngrMvIngrTags {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  ing_id!: number;

  @Column()
  ing_tag!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => IngrMgIngredients)
  @JoinColumn({ name: 'ing_id', referencedColumnName: 'id' })
  ingredient!: IngrMgIngredients;

  @ManyToOne(() => SysCatConfig)
  @JoinColumn({ name: 'ing_tag', referencedColumnName: 'id' })
  tag!: SysCatConfig;
}
