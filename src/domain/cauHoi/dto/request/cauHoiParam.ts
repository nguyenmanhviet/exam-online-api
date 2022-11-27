import { ApiProperty } from '@nestjs/swagger';

export class getCauHoiInput {
  @ApiProperty()
  hocPhanId: number;

  @ApiProperty()
  soLuongCauHoi: string;
}
