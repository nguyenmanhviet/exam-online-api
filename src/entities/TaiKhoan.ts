import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VaiTro } from './VaiTro';

@Entity('TaiKhoan')
export class TaiKhoan extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  roleId: number;

  @Column('nvarchar')
  username: string;

  @Column('nvarchar')
  password: string;

  @Column('datetime2', { name: 'validFrom' })
  validFrom: Date;

  @Column('datetime2', { name: 'validTo' })
  validTo: Date;

  @ManyToOne(() => VaiTro, (VaiTro) => VaiTro.id)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  vaiTro: VaiTro;
}
