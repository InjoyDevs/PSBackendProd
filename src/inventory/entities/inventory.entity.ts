import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  deviceId: number;

  @Column({ type: 'int' })
  ingredientId: number;

  @Column({ type: 'float' })
  currentVolume: number;

  @Column({ type: 'float' })
  capacity: number;
}
