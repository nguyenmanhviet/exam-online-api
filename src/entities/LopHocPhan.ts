import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HocKy } from './HocKy';
import { HocPhan } from './HocPhan';
import { NamHoc } from './NamHoc';
import { NguoiDung } from './NguoiDung';

@Entity('LopHocPhan')
export class LopHocPhan extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  hocPhanId: number;

  @Column('int')
  giangVienId: number;

  @Column('int')
  namHocId: number;

  @Column('int')
  hocKyId: number;

  @Column('nvarchar')
  tenLop: string;

  @Column('nvarchar')
  maLop: string;

  @Column('datetime2', { name: 'validFrom' })
  validFrom: Date;

  @Column('datetime2', { name: 'validTo' })
  validTo: Date;

  @ManyToOne(() => HocPhan, (HocPhan) => HocPhan.id)
  @JoinColumn({ name: 'hocPhanId', referencedColumnName: 'id' })
  hocPhan: HocPhan;

  @ManyToOne(() => NguoiDung, (NguoiDung) => NguoiDung.id)
  @JoinColumn({ name: 'giangVienId', referencedColumnName: 'id' })
  giangVien: NguoiDung;

  @ManyToOne(() => NamHoc, (NamHoc) => NamHoc.id)
  @JoinColumn({ name: 'namHocId', referencedColumnName: 'id' })
  namHoc: NamHoc;

  @ManyToOne(() => HocKy, (HocKy) => HocKy.id)
  @JoinColumn({ name: 'hocKyId', referencedColumnName: 'id' })
  hocKy: NamHoc;
}
