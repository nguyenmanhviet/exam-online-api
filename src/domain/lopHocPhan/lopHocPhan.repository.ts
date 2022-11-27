import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { LopHocPhanKyThi } from 'src/entities/LopHocPhanKyThi';
import { SinhVienLopHocPhan } from 'src/entities/SinhVienLopHocPhan';
import { ILike, In, Not } from 'typeorm';
import { AddClassSubjectInput } from './dto/request/addClassSubjectInput';
import { AddClassSubjectToExam } from './dto/request/addClassSubjectToExam';
import { AddStudentToClassInput } from './dto/request/addStudentToClassInput';

@Injectable()
export class LopHocPhanRepository {
  async getLopHocphanWithSV(userId: string, queryParams: QueryFilterDto) {
    const lopHocPhanSinhVien = await SinhVienLopHocPhan.getRepository().find({
      where: {
        sinhVienId: Number(userId),
      },
    });

    const lopHocPhanIdArray = lopHocPhanSinhVien.map((lhp) => lhp.lopHocPhanId);

    const lopHocPhanQuery = LopHocPhan.createQueryBuilder()
      .leftJoinAndSelect('LopHocPhan.hocPhan', 'hocPhan')
      .leftJoinAndSelect('LopHocPhan.giangVien', 'giangVien')
      .leftJoinAndSelect('LopHocPhan.namHoc', 'namHoc')
      .leftJoinAndSelect('LopHocPhan.hocKy', 'hocKy')
      .where({
        id: In(lopHocPhanIdArray),
      });

    if (queryParams.semesterId) {
      lopHocPhanQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      lopHocPhanQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      lopHocPhanQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    return paginate(lopHocPhanQuery, queryParams);
  }

  async getAllClassSubject(queryParams: QueryFilterDto) {
    const lopHocPhanQuery = LopHocPhan.createQueryBuilder()
      .leftJoinAndSelect('LopHocPhan.hocPhan', 'hocPhan')
      .leftJoinAndSelect('LopHocPhan.giangVien', 'giangVien')
      .leftJoinAndSelect('LopHocPhan.namHoc', 'namHoc')
      .leftJoinAndSelect('LopHocPhan.hocKy', 'hocKy');

    if (queryParams.semesterId) {
      lopHocPhanQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      lopHocPhanQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      lopHocPhanQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      console.log(queryParams.q);
      lopHocPhanQuery.andWhere({
        tenLop: ILike(queryParams.q),
      });
      lopHocPhanQuery.orWhere({
        maLop: ILike(queryParams.q),
      });
    }

    return paginate(lopHocPhanQuery, queryParams);
  }

  async getAllClassSubjectWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    const lopHocPhanQuery = LopHocPhan.createQueryBuilder()
      .leftJoinAndSelect('LopHocPhan.hocPhan', 'hocPhan')
      .leftJoinAndSelect('LopHocPhan.giangVien', 'giangVien')
      .leftJoinAndSelect('LopHocPhan.namHoc', 'namHoc')
      .leftJoinAndSelect('LopHocPhan.hocKy', 'hocKy')
      .where({
        giangVienId: teacherId,
      });

    if (queryParams.semesterId) {
      lopHocPhanQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      lopHocPhanQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      lopHocPhanQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      console.log(queryParams.q);
      lopHocPhanQuery.andWhere({
        tenLop: ILike(queryParams.q),
      });
      lopHocPhanQuery.orWhere({
        maLop: ILike(queryParams.q),
      });
    }

    return paginate(lopHocPhanQuery, queryParams);
  }

  async addStudentToClass(classId: string, payload: AddStudentToClassInput) {
    const { studentId } = payload;
    const record = studentId.map((id) => ({
      lopHocPhanId: Number(classId),
      sinhVienId: id,
    }));

    await SinhVienLopHocPhan.createQueryBuilder()
      .insert()
      .into(SinhVienLopHocPhan)
      .values(record)
      .execute();
  }

  async AddClassSubject(payload: AddClassSubjectInput) {
    await LopHocPhan.getRepository().save(
      LopHocPhan.create({
        giangVienId: payload.giangVienId,
        hocKyId: payload.hocKyId,
        namHocId: payload.namHocId,
        hocPhanId: payload.hocPhanId,
        tenLop: payload.tenLop,
        maLop: payload.maLop,
      }),
    );
  }

  async getClassSubjectInExam(examId: string, queryParams: QueryFilterDto) {
    const classSubjectInExam = await LopHocPhanKyThi.getRepository().find({
      where: {
        kyThiId: Number(examId),
      },
    });

    const allClassSubjectId = classSubjectInExam.map(
      (classInExam) => classInExam.lopHocPhanId,
    );

    const ClassSubjectQuery = LopHocPhan.createQueryBuilder()
      .leftJoinAndSelect('LopHocPhan.hocPhan', 'hocPhan')
      .leftJoinAndSelect('LopHocPhan.giangVien', 'giangVien')
      .leftJoinAndSelect('LopHocPhan.namHoc', 'namHoc')
      .leftJoinAndSelect('LopHocPhan.hocKy', 'hocKy')
      .where({
        id: In(allClassSubjectId),
      });

    return paginate(ClassSubjectQuery, queryParams);
  }

  async getClassSubjectNotInExam(examId: string, queryParams: QueryFilterDto) {
    const classSubjectIdInExam = await LopHocPhanKyThi.getRepository().find({
      where: {
        kyThiId: Number(examId),
      },
    });

    const allClassSubjectId = classSubjectIdInExam.map(
      (classSubject) => classSubject.lopHocPhanId,
    );

    const classSubjectQuery = LopHocPhan.createQueryBuilder()
      .leftJoinAndSelect('LopHocPhan.hocPhan', 'hocPhan')
      .leftJoinAndSelect('LopHocPhan.giangVien', 'giangVien')
      .leftJoinAndSelect('LopHocPhan.namHoc', 'namHoc')
      .leftJoinAndSelect('LopHocPhan.hocKy', 'hocKy')
      .where({
        id: Not(In(allClassSubjectId)),
      });

    if (queryParams.semesterId) {
      classSubjectQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      classSubjectQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      classSubjectQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      classSubjectQuery.andWhere({
        tenLop: ILike(queryParams.q),
      });
      classSubjectQuery.orWhere({
        maLop: ILike(queryParams.q),
      });
    }

    return paginate(classSubjectQuery, queryParams);
  }

  async addClassSubjectToExam(examId: string, payload: AddClassSubjectToExam) {
    const { classSubjectId } = payload;
    const record = classSubjectId.map((id) => ({
      kyThiId: Number(examId),
      lopHocPhanId: id,
    }));

    console.log(record);

    await LopHocPhanKyThi.createQueryBuilder()
      .insert()
      .into(LopHocPhanKyThi)
      .values(record)
      .execute();
  }
}
