import { Module } from '@nestjs/common';
import { LopHocPhanController } from './lopHocPhan.controller';
import { LopHocPhanRepository } from './lopHocPhan.repository';
import { LopHocPhanService } from './lopHocPhan.service';

@Module({
  providers: [LopHocPhanRepository, LopHocPhanService],
  controllers: [LopHocPhanController],
})
export class LopHocPhanModule {}
