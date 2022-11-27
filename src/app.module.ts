import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CauHoiModule } from './domain/cauHoi/cauHoi.module';
import { KetQuaLamBaiModule } from './domain/ketQuaLamBai/ketQuaLamBai.module';
import { KyThiModule } from './domain/kyThi/kyThi.module';
import { LopHocPhanModule } from './domain/lopHocPhan/lopHocPhan.module';
import { UserModule } from './domain/nguoiDung/user.module';
import { SubjectModule } from './domain/subject/subject.module';
import { TaiKhoanModule } from './domain/taiKhoan/taiKhoan.module';
import { YearModule } from './domain/year/year.module';
import { CachThucGiamSat } from './entities/CachThucGiamSat';
import { CauHoi } from './entities/CauHoi';
import { DapAn } from './entities/DapAn';
import { HocKy } from './entities/HocKy';
import { HocPhan } from './entities/HocPhan';
import { KetQuaLamBai } from './entities/KetQuaLamBai';
import { Khoa } from './entities/Khoa';
import { KhoaHoc } from './entities/KhoaHoc';
import { KyThi } from './entities/KyThi';
import { Lop } from './entities/Lop';
import { LopHocPhan } from './entities/LopHocPhan';
import { LopHocPhanKyThi } from './entities/LopHocPhanKyThi';
import { MucDoCauHoi } from './entities/MucDoCauHoi';
import { NamHoc } from './entities/NamHoc';
import { NguoiDung } from './entities/NguoiDung';
import { SinhVienLopHocPhan } from './entities/SinhVienLopHocPhan';
import { TaiKhoan } from './entities/TaiKhoan';
import { VaiTro } from './entities/VaiTro';
import { CVExportProcess } from './service/exportPDF';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        ({
          // host in docker ci is 'db', not 'localhost'
          host:
            process.env.TEST_DB_HOST ||
            'exam.caayrcowewm7.ap-southeast-2.rds.amazonaws.com',
          username: 'admin',
          password: process.env.SA_PASSWORD || 'manhviet123',
          database: process.env.DATABASE_NAME || 'examOnline',
          type: 'mssql',
          port: 1433,
          logger: 'advanced-console',
          extra: {
            trustServerCertificate: true,
          },
          logging: false,
          requestTimeout: 300000,
          autoLoadEntities: true,
          synchronize: false,
          keepConnectionAlive: true,
          entities: [
            HocPhan,
            HocKy,
            Khoa,
            KhoaHoc,
            Lop,
            MucDoCauHoi,
            NamHoc,
            TaiKhoan,
            VaiTro,
            LopHocPhan,
            KyThi,
            LopHocPhanKyThi,
            NguoiDung,
            SinhVienLopHocPhan,
            CauHoi,
            DapAn,
            KetQuaLamBai,
            CachThucGiamSat,
          ],
        } as TypeOrmModuleOptions),
    }),
    TaiKhoanModule,
    LopHocPhanModule,
    KyThiModule,
    CauHoiModule,
    KetQuaLamBaiModule,
    SubjectModule,
    YearModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
