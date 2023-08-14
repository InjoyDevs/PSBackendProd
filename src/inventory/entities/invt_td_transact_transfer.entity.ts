import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AdvsMgDevices } from 'src/device/entities/device.entity';
import { InvtTdTransactTransferDetail } from './invt_td_transact_transfer_detail.entity';

@Entity({ name: 'invt_td_transact_transfer' })
export class InvtTdTransactTransfer {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'bigint' })
  transaction_id!: string;

  @Column({ type: 'varchar', length: 255 })
  transfer_id!: string;

  @Column({ type: 'bigint' })
  device_id!: string;

  @Column({ type: 'varchar', length: 255 })
  mode!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: string;

  @OneToMany(() => InvtTdTransactTransferDetail, (detail) => detail.transfer_id)
  transferDetails!: InvtTdTransactTransferDetail[];

  @ManyToOne(() => AdvsMgDevices, (device) => device.device_id)
  @JoinColumn({ name: 'device_id' })
  device!: AdvsMgDevices;
}
