import { ApiProperty } from '@nestjs/swagger';

export class SubmitInput {
  @ApiProperty()
  hocPhanId: number;

  @ApiProperty()
  kyThiId: number;

  @ApiProperty()
  namHocId: number;

  @ApiProperty()
  hocKyId: number;

  @ApiProperty()
  lopHocPhanId: number;

  @ApiProperty()
  tongSoCauHoi: number;

  @ApiProperty()
  timeStart: string;

  @ApiProperty()
  timeEnd: string;

  @ApiProperty()
  soLanViPham: number;

  @ApiProperty()
  answer: number[];
}
