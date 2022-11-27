import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearRepository } from './year.repository';
import { YearService } from './year.service';

@Module({
  providers: [YearRepository, YearService],
  controllers: [YearController],
})
export class YearModule {}
