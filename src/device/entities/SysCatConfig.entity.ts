import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
enum DeviceCategory {
  CATEGORY_1 = 'Category 1',
  CATEGORY_2 = 'Category 2',
  // Add more categories as needed
}

enum DeviceType {
  TYPE_1 = 'Type 1',
  TYPE_2 = 'Type 2',
  // Add more types as needed
}

@Entity('sys_cat_config_n_values')
export class SysCatConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DeviceCategory,
    default: DeviceCategory.CATEGORY_1,
  })
  @Column({
    type: 'enum',
    enum: DeviceType,
    default: DeviceType.TYPE_1,
  })
  type: DeviceType;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: string;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: string;
}
