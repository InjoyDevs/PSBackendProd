import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pump {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ type: 'int' })
  deviceId: number;

  // TODO: Update this to the db fields
  @Column({ type: 'json' })
  calibrationData: object;

  // TODO: Update this to the db fields
  @Column({ type: 'json' })
  pumpingInstructions: object;
}
