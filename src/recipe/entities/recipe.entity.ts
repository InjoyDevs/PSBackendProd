import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RangeServiceTypeConfig } from './range_service_type_config.entity'; // Replace with the actual import path
import { RecipeCancupConfig } from './recipe_can_cup_config.entity'; // Replace with the actual import path
import { SysCatConfig } from 'src/device/entities/sys_cat_config.entity'; // Replace with the actual import path

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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
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

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Column({ name: 'created_by', type: 'integer' })
  createdByUser!: number;
  @Column({ name: 'modified_by', type: 'integer' })
  modifiedByUser!: number;

  @ManyToOne(() => SysCatConfig)
  @JoinColumn({ name: 'recipe_type', referencedColumnName: 'id' })
  recipeType!: SysCatConfig;

  @OneToMany(
    () => RecipeCancupConfig,
    (recipeCancupConfig) => recipeCancupConfig.id,
  )
  @JoinColumn({ name: 'recipe_type', referencedColumnName: 'id' })
  recipeCancupConfigs!: RecipeCancupConfig[];

  @ManyToOne(
    () => RangeServiceTypeConfig,
    (rangeServiceTypeConfig) => rangeServiceTypeConfig.product_type,
  )
  @JoinColumn({ name: 'product_type', referencedColumnName: 'product_type' })
  productServiceType!: RangeServiceTypeConfig;
}
