// order_on_demand.model.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_on_demand')
export class OrderOnDemand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order: Order) => order.orderOnDemands)
  order: Order;

  @Column()
  recipe_id: number;

  @Column()
  cancup_id: number;

  @Column('decimal')
  qty: number;

  @Column('decimal')
  unit_range_price: number;

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
