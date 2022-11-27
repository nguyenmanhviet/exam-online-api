import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LopHocPhan } from './LopHocPhan';
import { NguoiDung } from './NguoiDung';

@Entity('SinhVienLopHocPhan')
export class SinhVienLopHocPhan extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  lopHocPhanId: number;

  @Column('int')
  sinhVienId: number;

  @OneToOne(() => LopHocPhan, (LopHocPhan) => LopHocPhan.id)
  @JoinColumn({ name: 'lopHocPhanId', referencedColumnName: 'id' })
  lopHocPhan: LopHocPhan;

  @ManyToOne(() => NguoiDung, (NguoiDung) => NguoiDung.id)
  @JoinColumn({ name: 'sinhVienId', referencedColumnName: 'id' })
  sinhVien: NguoiDung;
}
