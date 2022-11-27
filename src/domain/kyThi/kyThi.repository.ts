import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { KyThi } from 'src/entities/KyThi';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { LopHocPhanKyThi } from 'src/entities/LopHocPhanKyThi';
import { SinhVienLopHocPhan } from 'src/entities/SinhVienLopHocPhan';
import { ILike, In } from 'typeorm';
import { AddExamInput } from './dto/request/addExamInput';

@Injectable()
export class KyThiRepository {
  async getKyThiWithSV(userId: string, queryParams: QueryFilterDto) {
    const lopHocPhanSinhVien = await SinhVienLopHocPhan.getRepository().find({
      where: {
        sinhVienId: Number(userId),
      },
    });

    const lopHocPhanIdArray = lopHocPhanSinhVien.map((lhp) => lhp.lopHocPhanId);

    const lopHocPhanCuaSinhVienDuocThamGiaThi =
      await LopHocPhanKyThi.getRepository().find({
        where: {
          lopHocPhanId: In(lopHocPhanIdArray),
        },
      });

    const kyThiIdArray = lopHocPhanCuaSinhVienDuocThamGiaThi.map(
      (lhp) => lhp.kyThiId,
    );

    const kyThiQuery = KyThi.createQueryBuilder()
      .leftJoinAndSelect('KyThi.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KyThi.namHoc', 'namHoc')
      .leftJoinAndSelect('KyThi.hocKy', 'hocKy')
      .where({
        id: In(kyThiIdArray),
      });

    return paginate(kyThiQuery, queryParams);
  }

  async getAllExam(queryParams: QueryFilterDto) {
    const kyThiQuery = KyThi.createQueryBuilder()
      .leftJoinAndSelect('KyThi.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KyThi.namHoc', 'namHoc')
      .leftJoinAndSelect('KyThi.hocKy', 'hocKy')
      .leftJoinAndSelect('KyThi.cachThucGiamSat', 'cachThucGiamSat');

    if (queryParams.semesterId) {
      kyThiQuery.where({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      kyThiQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      kyThiQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      kyThiQuery.andWhere({
        kyThi: ILike(queryParams.q),
      });
    }

    return paginate(kyThiQuery, queryParams);
  }

  async getAllExamWithTeacher(teacherId: string, queryParams: QueryFilterDto) {
    const allClassSubject = await LopHocPhan.getRepository().find({
      where: {
        giangVienId: Number(teacherId),
      },
    });

    const allSubjectId = allClassSubject.map(
      (classSubject) => classSubject.hocPhanId,
    );

    const kyThiQuery = KyThi.createQueryBuilder()
      .leftJoinAndSelect('KyThi.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KyThi.namHoc', 'namHoc')
      .leftJoinAndSelect('KyThi.hocKy', 'hocKy')
      .leftJoinAndSelect('KyThi.cachThucGiamSat', 'cachThucGiamSat')
      .where({
        hocPhanId: In(allSubjectId),
      });

    if (queryParams.semesterId) {
      kyThiQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      kyThiQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      kyThiQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      kyThiQuery.andWhere({
        kyThi: ILike(queryParams.q),
      });
    }

    return paginate(kyThiQuery, queryParams);
  }

  async addExam(payload: AddExamInput) {
    await KyThi.getRepository().save(
      KyThi.create({
        hocPhanId: payload.subjectId,
        hocKyId: payload.semesterId,
        namHocId: payload.yearId,
        kyThi: payload.examName,
        timeStart: payload.timeStart,
        timeEnd: payload.timeEnd,
        soCauHoi: payload.volumeQuestion,
        thoiGianLamBai: payload.timeDoQuiz,
        soLuotLamBai: payload.turnDoQuiz,
        password: payload.password,
        cachThucGiamSatId: payload.observationId,
      }),
    );
  }
}
