import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HocPhan')
export class HocPhan extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar')
  hocPhan: string;

  @Column('nvarchar')
  maHocPhan: string;
}
