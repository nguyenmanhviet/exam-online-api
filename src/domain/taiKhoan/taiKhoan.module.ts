import { Module } from '@nestjs/common';
import { TaiKhoanController } from './taiKhoan.controller';
import { TaiKhoanRepository } from './taiKhoan.repository';
import { TaiKhoanService } from './taiKhoan.service';

@Module({
  providers: [TaiKhoanRepository, TaiKhoanService],
  controllers: [TaiKhoanController],
})
export class TaiKhoanModule {}
