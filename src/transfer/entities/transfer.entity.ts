import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  sourceDeviceId: number;

  @Column({ type: 'int' })
  destinationDeviceId: number;

  @Column({ type: 'int' })
  ingredientId: number;

  @Column({ type: 'float' })
  transferredVolume: number;
}
