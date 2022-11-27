import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HocPhan } from './HocPhan';
import { MucDoCauHoi } from './MucDoCauHoi';

@Entity('CauHoi')
export class CauHoi extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  hocPhanId: number;

  @Column('int')
  mucDoCauHoiId: number;

  @Column('nvarchar')
  cauHoi: string;

  @Column('nvarchar')
  tenCauHoi: string;

  @OneToOne(() => HocPhan, (hocPhan) => hocPhan.id)
  @JoinColumn({ name: 'hocPhanId', referencedColumnName: 'id' })
  hocPhan: HocPhan;

  @ManyToOne(() => MucDoCauHoi, (mucDoCauHoi) => mucDoCauHoi.id)
  @JoinColumn({ name: 'mucDoCauHoiId', referencedColumnName: 'id' })
  mucDoCauHoi: MucDoCauHoi;
}
