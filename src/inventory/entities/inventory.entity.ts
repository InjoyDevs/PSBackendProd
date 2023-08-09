import { Device } from 'src/device/entities/device.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Device)
  @JoinColumn()
  deviceId: number;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'int' })
  ingredientId: number;

  @Column({ type: 'float' })
  currentVolume: number;

  @Column({ type: 'float' })
  capacity: number;
}
