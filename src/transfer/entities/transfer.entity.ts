import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'int' })
  sourceDeviceId: number;

  @Column({ type: 'int' })
  hubId: number;

  @Column({ type: 'int' })
  dockId: number;

  @Column({ type: 'int' })
  dispenserId: number;

  @Column({ type: 'int' })
  destinationDeviceId: number;

  @Column({ type: 'int' })
  ingredientId: number;

  @Column({ type: 'float' })
  transferredVolume: number;
}
