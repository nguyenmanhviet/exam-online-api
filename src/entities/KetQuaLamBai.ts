import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HocKy } from './HocKy';
import { HocPhan } from './HocPhan';
import { KyThi } from './KyThi';
import { LopHocPhan } from './LopHocPhan';
import { NamHoc } from './NamHoc';
import { NguoiDung } from './NguoiDung';

@Entity('KetQuaLamBai')
export class KetQuaLamBai extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  hocPhanId: number;

  @Column('int')
  namHocId: number;

  @Column('int')
  hocKyId: number;

  @Column('int')
  lopHocPhanId: number;

  @Column('int')
  kyThiId: number;

  @Column('int')
  sinhVienId: number;

  @CreateDateColumn()
  timeStart: Date;

  @CreateDateColumn()
  timeEnd: Date;

  @Column('int')
  tongSoCauHoi: number;

  @Column('int')
  soCauDung: number;

  @Column('int')
  soLanViPham: number;

  @ManyToOne(() => HocPhan, (HocPhan) => HocPhan.id)
  @JoinColumn({ name: 'hocPhanId', referencedColumnName: 'id' })
  hocPhan: HocPhan;

  @ManyToOne(() => NamHoc, (NamHoc) => NamHoc.id)
  @JoinColumn({ name: 'namHocId', referencedColumnName: 'id' })
  namHoc: NamHoc;

  @ManyToOne(() => HocKy, (HocKy) => HocKy.id)
  @JoinColumn({ name: 'hocKyId', referencedColumnName: 'id' })
  hocKy: NamHoc;

  @ManyToOne(() => LopHocPhan, (lopHocPhan) => lopHocPhan.id)
  @JoinColumn({ name: 'lopHocPhanId', referencedColumnName: 'id' })
  lopHocPhan: LopHocPhan;

  @ManyToOne(() => KyThi, (kyThi) => kyThi.id)
  @JoinColumn({ name: 'kyThiId', referencedColumnName: 'id' })
  kyThi: KyThi;

  @ManyToOne(() => NguoiDung, (nguoiDung) => nguoiDung.id)
  @JoinColumn({ name: 'sinhVienId', referencedColumnName: 'id' })
  sinhVien: NguoiDung;
}
