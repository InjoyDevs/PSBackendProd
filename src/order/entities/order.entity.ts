import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderSubscription } from './order_subscription.entity';
import { OrderOnDemand } from './order_on_demand.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razorpay_order_id: string;

  @Column()
  razorpay_payment_id: string;

  @Column()
  user_id: number;

  @Column()
  device_id: number;

  @Column()
  type_of_service: number;

  @Column()
  range_id: number;

  @Column('decimal')
  cart_total: number;

  @Column('decimal')
  tax_in_percentage: number;

  @Column('decimal')
  tax_in_amount: number;

  @Column('decimal')
  total_payable_amount: number;

  @Column('decimal')
  delivery_charges: number;

  @Column('decimal')
  discount_price: number;

  @Column()
  order_status: string;

  @Column()
  payment_status: string;

  // user_location: Point; // Define this field if you have postGIS extension in your PostgreSQL instance.
  // user_site_location_ref: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations

  @OneToMany(
    () => OrderSubscription,
    (orderSubscription: OrderSubscription) => orderSubscription.order,
  )
  orderSubscriptions: OrderSubscription[];

  @OneToMany(
    () => OrderOnDemand,
    (orderOnDemand: OrderOnDemand) => orderOnDemand.order,
  )
  orderOnDemands: OrderOnDemand[];
}
