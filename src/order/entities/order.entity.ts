import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  deviceId: number;

  @Column({ type: 'int' })
  recipeId: number;

  @Column({ type: 'float' })
  volume: number;
}
