import { Module } from '@nestjs/common';
import { CauHoiController } from './cauHoi.controller';
import { CauHoiRepository } from './cauHoi.repository';
import { CauHoiService } from './cauHoi.service';

@Module({
  providers: [CauHoiRepository, CauHoiService],
  controllers: [CauHoiController],
})
export class CauHoiModule {}
