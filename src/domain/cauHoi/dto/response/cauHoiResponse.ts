import { DapAn } from 'src/entities/DapAn';

export class CauHoiResponse {
  id: number;
  cauHoi: string;
  dapAn?: DapAn[];
}
