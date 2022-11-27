import { Module } from '@nestjs/common';
import { CVExportProcess } from 'src/service/exportPDF';
import { S3Service } from 'src/service/s3/s3Service';
import { ResultService } from 'src/service/table';
import { KetQuaLamBaiController } from './ketQuaLamBai.controller';
import { KetQuaLamBaiRepository } from './ketQuaLamBai.repository';
import { KetQuaLamBaiService } from './ketQuaLamBai.service';

@Module({
  providers: [
    KetQuaLamBaiRepository,
    KetQuaLamBaiService,
    ResultService,
    S3Service,
    CVExportProcess,
  ],
  controllers: [KetQuaLamBaiController],
})
export class KetQuaLamBaiModule {}
