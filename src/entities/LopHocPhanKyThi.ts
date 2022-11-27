import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KyThi } from './KyThi';
import { LopHocPhan } from './LopHocPhan';

@Entity('LopHocPhanKyThi')
export class LopHocPhanKyThi extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  lopHocPhanId: number;

  @Column('int')
  kyThiId: number;

  @ManyToOne(() => LopHocPhan, (LopHocPhan) => LopHocPhan.id)
  @JoinColumn({ name: 'lopHocPhanId', referencedColumnName: 'id' })
  lopHocPhan: LopHocPhan;

  @ManyToOne(() => KyThi, (KyThi) => KyThi.id)
  @JoinColumn({ name: 'kyThiId', referencedColumnName: 'id' })
  KyThi: KyThi;
}
