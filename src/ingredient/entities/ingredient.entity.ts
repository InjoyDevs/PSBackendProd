import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  // TODO: Update this to the actual db fields
  @Column({ type: 'json' })
  batchProperties: object;

  @Column({ type: 'float' })
  referenceValue: number;
}
