import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('ingr_mg_ingredients')
export class IngrMgIngredients {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  ing_id!: string;

  @Column()
  name!: string;

  @Column()
  ref_value!: number;

  @Column()
  price_per_ml!: number;

  @Column()
  category!: number;

  @Column()
  sub_category!: number;

  @Column()
  unit_of_ingredient!: string;

  @Column()
  can_be_pumped!: boolean;

  @Column()
  is_raw_material!: boolean;

  @Column()
  created_by!: number;

  @Column()
  modified_by!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
