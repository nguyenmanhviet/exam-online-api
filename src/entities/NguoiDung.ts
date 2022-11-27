import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Khoa } from './Khoa';
import { Lop } from './Lop';
import { TaiKhoan } from './TaiKhoan';

@Entity('NguoiDung')
export class NguoiDung extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  taiKhoanId: number;

  @Column('int')
  lopId: number;

  @Column('int')
  khoaId: number;

  @Column('nvarchar')
  mssv: string;

  @Column('nvarchar')
  hoTen: string;

  @Column('bit')
  gioiTinh: boolean;

  @Column('date')
  ngaySinh: Date;

  @Column('nvarchar')
  sdt: string;

  @Column('nvarchar')
  email: string;

  @Column('nvarchar', { name: 'khoa' })
  khoaHoc: string;

  @Column('datetime2', { name: 'validFrom' })
  validFrom: Date;

  @Column('datetime2', { name: 'validTo' })
  validTo: Date;

  @OneToOne(() => TaiKhoan, (taiKhoan) => taiKhoan.id)
  @JoinColumn({ name: 'taiKhoanId', referencedColumnName: 'id' })
  taiKhoan: TaiKhoan;

  @ManyToOne(() => Lop, (lop) => lop.id)
  @JoinColumn({ name: 'lopId', referencedColumnName: 'id' })
  lop: Lop;

  @ManyToOne(() => Khoa, (khoa) => khoa.id)
  @JoinColumn({ name: 'khoaId', referencedColumnName: 'id' })
  khoa: Khoa;
}
