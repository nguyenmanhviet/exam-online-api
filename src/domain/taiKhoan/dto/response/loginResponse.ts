import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  role: string;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}
