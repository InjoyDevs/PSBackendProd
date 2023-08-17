// order_subscription.model.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_subscription')
export class OrderSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order: Order) => order.orderSubscriptions)
  order: Order;

  @Column()
  subscription_name: string;

  @Column()
  from_date: Date;

  @Column()
  to_date: Date;

  @Column()
  user_id: number;

  @Column('decimal')
  item_volume: number;

  @Column('decimal')
  cart_total: number;

  @Column('decimal')
  order_price: number;

  @Column('decimal')
  delivery_charges: number;

  @Column()
  no_of_deliveries: number;

  @Column('decimal')
  per_delivery_charge: number;

  @Column()
  is_pos: boolean;

  // user_location: Point; // Define this field if you have postGIS extension in your PostgreSQL instance.
  // user_site_location_ref: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
