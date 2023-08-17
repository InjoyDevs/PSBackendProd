import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('cart_mg_cancup_size_config')
export class CartMgCancupSizeConfig {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  cancup_size!: string;

  @Column()
  cancup_vol_ml!: number;

  @Column('text')
  description!: string;

  @Column()
  cost!: number;

  @Column()
  price!: number;

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
  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;
  //maked this using number only , did'nt include the relationship
  @Column({ name: 'created_by', type: 'int' })
  createdByUser!: number;

  @Column({ name: 'modified_by', type: 'int' })
  modifiedByUser!: number;
}
