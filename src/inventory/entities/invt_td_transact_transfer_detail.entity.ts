import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity'; // Make sure to import the correct path

@Entity({ name: 'invt_td_transact_transfer_detail' })
export class InvtTdTransactTransferDetail {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  transfer_id!: string;

  @Column()
  ingredient_id!: string;

  @Column()
  volume!: number;

  @Column()
  batch_id!: string;

  @Column()
  status!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  start_time!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  end_time!: string;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => IngrMgIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient!: IngrMgIngredients;
}
