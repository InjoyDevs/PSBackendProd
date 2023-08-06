import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'json' })
  pumpData: object;

  @Column({ type: 'json' })
  dockDetails: object;

  @Column({ type: 'text' })
  digitalSignature: string;
  inventoryLevel: number;
  capacity: number;
  inventory: any;
  inventoryId: number;
  currentLevel: number;
  level: number;
}
