import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { LoginInput } from './dto/request/loginInput';
import { LoginResponse } from './dto/response/loginResponse';
import { TaiKhoanService } from './taiKhoan.service';

@Controller()
export class TaiKhoanController {
  constructor(private taiKhoanService: TaiKhoanService) {}
  @Post('/login')
  @ApiOkResponse({
    type: LoginResponse,
  })
  async login(@Body() payload: LoginInput): Promise<LoginResponse> {
    return await this.taiKhoanService.login(payload);
  }

  @Get('/account')
  async getAllAccount(@Query() queryParams: QueryFilterDto) {
    return await this.taiKhoanService.getAllAccount(queryParams);
  }
}
