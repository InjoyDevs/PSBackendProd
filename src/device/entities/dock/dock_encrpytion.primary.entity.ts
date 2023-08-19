import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dock_encrpytion')
export class DockEncryption {
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  dock_point_id!: number;

  @Column()
  device_id!: number;

  @Column()
  public_key!: string;
}
