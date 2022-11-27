import { Module } from '@nestjs/common';
import { KyThiController } from './kyThi.controller';
import { KyThiRepository } from './kyThi.repository';
import { KyThiService } from './kyThi.service';

@Module({
  providers: [KyThiRepository, KyThiService],
  controllers: [KyThiController],
})
export class KyThiModule {}
