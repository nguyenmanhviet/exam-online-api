import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CauHoi } from './CauHoi';

@Entity('DapAn')
export class DapAn extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  cauHoiId: number;

  @Column('nvarchar')
  dapAn: string;

  @Column('bit')
  dapAnDung: boolean;

  @ManyToOne(() => CauHoi, (cauHoi) => cauHoi.id)
  @JoinColumn({ name: 'cauHoiId', referencedColumnName: 'id' })
  cauHoi: CauHoi;
}
