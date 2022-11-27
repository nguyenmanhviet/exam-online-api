import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CachThucGiamSat } from './CachThucGiamSat';
import { HocKy } from './HocKy';
import { HocPhan } from './HocPhan';
import { NamHoc } from './NamHoc';

@Entity('KyThi')
export class KyThi extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  hocPhanId: number;

  @Column('int')
  namHocId: number;

  @Column('int')
  hocKyId: number;

  @Column('int')
  cachThucGiamSatId: number;

  @Column('nvarchar')
  kyThi: string;

  @CreateDateColumn()
  timeStart: Date;

  @CreateDateColumn()
  timeEnd: Date;

  @Column('int')
  soCauHoi: number;

  @Column('int')
  thoiGianLamBai: number;

  @Column('int')
  soLuotLamBai: number;

  @Column('nvarchar')
  password: string;

  @Column('datetime2', { name: 'validFrom' })
  validFrom: Date;

  @Column('datetime2', { name: 'validTo' })
  validTo: Date;

  @ManyToOne(() => HocPhan, (HocPhan) => HocPhan.id)
  @JoinColumn({ name: 'hocPhanId', referencedColumnName: 'id' })
  hocPhan: HocPhan;

  @ManyToOne(() => NamHoc, (NamHoc) => NamHoc.id)
  @JoinColumn({ name: 'namHocId', referencedColumnName: 'id' })
  namHoc: NamHoc;

  @ManyToOne(() => HocKy, (HocKy) => HocKy.id)
  @JoinColumn({ name: 'hocKyId', referencedColumnName: 'id' })
  hocKy: HocKy;

  @ManyToOne(() => CachThucGiamSat, (cach) => cach.id)
  @JoinColumn({ name: 'cachThucGiamSatId', referencedColumnName: 'id' })
  cachThucGiamSat: CachThucGiamSat;
}
