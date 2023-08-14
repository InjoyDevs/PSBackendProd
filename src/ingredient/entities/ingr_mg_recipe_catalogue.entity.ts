import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { RecipeCancupConfig } from 'src/recipe/entities/recipe_can_cup_config.entity';
import { RangeServiceTypeConfig } from 'src/recipe/entities/range_service_type_config.entity';
import { SysCatConfig } from 'src/device/entities/sys_cat_config.entity';

@Entity('ingr_mg_recipe_catalogue')
export class IngrMgRecipeCatalogue {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  recipe!: string;

  @Column()
  recipe_code!: string;

  @Column()
  recipe_name!: string;

  @Column()
  product_type!: number;

  @Column()
  product_category!: number;

  @Column()
  recipe_type!: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  published!: Date;

  @Column()
  volume!: number;

  @Column()
  price!: number;

  @Column()
  min_price!: number;

  @Column()
  max_price!: number;

  @Column()
  base_price!: number;

  @Column()
  created_by!: number;

  @Column()
  modified_by!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at!: Date;

  // added a number instead of a relationship
  @Column({ name: 'created_by', type: 'integer' })
  createdByUser!: number;

  // added a number instead of a relationship
  @Column({ name: 'modified_by', type: 'integer' })
  modifiedByUser!: number;

  @ManyToOne(() => SysCatConfig, (sysCatConfig) => sysCatConfig.id)
  @JoinColumn({ name: 'recipe_type' })
  recipeType!: SysCatConfig;

  @OneToMany(
    () => RecipeCancupConfig,
    (recipeCancupConfig) => recipeCancupConfig.id,
  )
  recipeCancupConfigs!: RecipeCancupConfig[];

  @ManyToOne(
    () => RangeServiceTypeConfig,
    (rangeServiceTypeConfig) => rangeServiceTypeConfig.product_type,
  )
  @JoinColumn({ name: 'product_type' })
  productType!: RangeServiceTypeConfig;
}
