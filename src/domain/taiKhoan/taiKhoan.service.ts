import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { LoginInput } from './dto/request/loginInput';
import { LoginResponse } from './dto/response/loginResponse';
import { TaiKhoanRepository } from './taiKhoan.repository';

@Injectable()
export class TaiKhoanService {
  constructor(private taiKhoanRepo: TaiKhoanRepository) {}

  async login(payload: LoginInput): Promise<LoginResponse> {
    return await this.taiKhoanRepo.login(payload);
  }

  async getAllAccount(queryParams: QueryFilterDto) {
    return await this.taiKhoanRepo.getAllAccount(queryParams);
  }
}
