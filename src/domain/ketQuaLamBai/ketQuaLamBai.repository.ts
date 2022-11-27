import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { HocKy } from 'src/entities/HocKy';
import { HocPhan } from 'src/entities/HocPhan';
import { KetQuaLamBai } from 'src/entities/KetQuaLamBai';
import { Khoa } from 'src/entities/Khoa';
import { KyThi } from 'src/entities/KyThi';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { NamHoc } from 'src/entities/NamHoc';
import { NguoiDung } from 'src/entities/NguoiDung';
import { CVExportProcess } from 'src/service/exportPDF';
import { S3Service } from 'src/service/s3/s3Service';
import { In } from 'typeorm';
import { ExportPDFInput } from './dto/request/exportPDF';

@Injectable()
export class KetQuaLamBaiRepository {
  constructor(
    private s3Service: S3Service,
    private exportPdf: CVExportProcess,
  ) {}

  async getKetQuaLamBaiWithSV(userId: string, queryParams: QueryFilterDto) {
    const ketQuaQuery = await KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien')
      .where({
        sinhVienId: userId,
      });

    if (queryParams.semesterId) {
      ketQuaQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      ketQuaQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.subjectId) {
      ketQuaQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }
    return paginate(ketQuaQuery, queryParams);
  }

  async getResultStudentWithSubject(
    userId: string,
    examId: string,
    queryParams: QueryFilterDto,
  ) {
    const ketQuaQuery = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien')
      .where({
        sinhVienId: userId,
        lopHocPhanId: examId,
      });
    return paginate(ketQuaQuery, queryParams);
  }

  async getAllResult(queryParams: QueryFilterDto) {
    const resultQuery = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien');

    if (queryParams.semesterId) {
      resultQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      resultQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.classId) {
      resultQuery.andWhere({
        lopHocPhanId: queryParams.classId,
      });
    }

    if (queryParams.examId) {
      resultQuery.andWhere({
        kyThiId: queryParams.examId,
      });
    }

    if (queryParams.subjectId) {
      resultQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.majorId) {
      const allStudentInMajor = await NguoiDung.getRepository().find({
        where: {
          khoaId: Number(queryParams.majorId),
        },
      });
      resultQuery.andWhere({
        sinhVienId: In(allStudentInMajor.map((student) => student.id)),
      });
    }

    return paginate(resultQuery, queryParams);
  }

  async getAllResultWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    const allClassSubject = await LopHocPhan.getRepository().find({
      where: {
        giangVienId: Number(teacherId),
      },
    });

    const resultQuery = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien')
      .where({
        lopHocPhanId: In(
          allClassSubject.map((classSubject) => classSubject.id),
        ),
      });

    if (queryParams.semesterId) {
      resultQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      resultQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.classId) {
      resultQuery.andWhere({
        lopHocPhanId: queryParams.classId,
      });
    }

    if (queryParams.examId) {
      resultQuery.andWhere({
        kyThiId: queryParams.examId,
      });
    }

    if (queryParams.subjectId) {
      resultQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.majorId) {
      const allStudentInMajor = await NguoiDung.getRepository().find({
        where: {
          khoaId: Number(queryParams.majorId),
        },
      });
      resultQuery.andWhere({
        sinhVienId: In(allStudentInMajor.map((student) => student.id)),
      });
    }

    return paginate(resultQuery, queryParams);
  }

  async getAllResultPDF(payload: ExportPDFInput, queryParams: QueryFilterDto) {
    let subject = 'Tất cả';
    let classSubject = 'Tất cả';
    let semester = 'Tất cả';
    const teacher = 'Theo các lớp học phần';
    let year = 'Tất cả';
    let exam = 'Tất cả';
    let major = 'Tất cả';

    const resultQuery = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien');

    if (queryParams.semesterId) {
      const semesterDB = await HocKy.getRepository().findOne({
        where: {
          id: queryParams.semesterId,
        },
      });

      semester = semesterDB.hocKy;
      resultQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      const yearDB = await NamHoc.getRepository().findOne({
        where: {
          id: queryParams.yearId,
        },
      });

      year = yearDB.namHoc;
      resultQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.classId) {
      const classDB = await LopHocPhan.getRepository().findOne({
        where: {
          id: queryParams.classId,
        },
      });

      classSubject = classDB.tenLop;
      resultQuery.andWhere({
        lopHocPhanId: queryParams.classId,
      });
    }

    if (queryParams.examId) {
      const examDB = await KyThi.getRepository().findOne({
        where: {
          id: queryParams.examId,
        },
      });

      exam = examDB.kyThi;
      resultQuery.andWhere({
        kyThiId: queryParams.examId,
      });
    }

    if (queryParams.subjectId) {
      const subjectDB = await HocPhan.getRepository().findOne({
        where: {
          id: queryParams.subjectId,
        },
      });

      subject = subjectDB.hocPhan;
      resultQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.majorId) {
      const majorDB = await Khoa.getRepository().findOne({
        where: {
          id: queryParams.subjectId,
        },
      });

      major = majorDB.khoa;
      const allStudentInMajor = await NguoiDung.getRepository().find({
        where: {
          khoaId: Number(queryParams.majorId),
        },
      });
      resultQuery.andWhere({
        sinhVienId: In(allStudentInMajor.map((student) => student.id)),
      });
    }

    const ketQua = await resultQuery.getMany();

    const buffer = await this.exportPdf.run(ketQua, {
      subject,
      classSubject,
      semester,
      teacher,
      year,
      exam,
      major,
    });

    const s3Service = new S3Service();

    console.log(buffer);
    const result = await s3Service.upload(
      buffer,
      payload.filename,
      payload.type,
    );

    return result;
  }

  async getAllResultPDFWithTeacher(
    teacherId: string,
    payload: ExportPDFInput,
    queryParams: QueryFilterDto,
  ) {
    let subject = 'Tất cả';
    let classSubject = 'Tất cả';
    let semester = 'Tất cả';
    let teacher = 'Theo các lớp học phần';
    let year = 'Tất cả';
    let exam = 'Tất cả';
    let major = 'Tất cả';

    const teacherDB = await NguoiDung.getRepository().findOne({
      where: {
        id: Number(teacherId),
      },
    });

    teacher = teacherDB.hoTen;

    const allClassSubject = await LopHocPhan.getRepository().find({
      where: {
        giangVienId: Number(teacherId),
      },
    });

    const resultQuery = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.sinhVien', 'sinhVien')
      .where({
        lopHocPhanId: In(
          allClassSubject.map((classSubject) => classSubject.id),
        ),
      });

    if (queryParams.semesterId) {
      const semesterDB = await HocKy.getRepository().findOne({
        where: {
          id: queryParams.semesterId,
        },
      });

      semester = semesterDB.hocKy;

      resultQuery.andWhere({
        hocKyId: queryParams.semesterId,
      });
    }

    if (queryParams.yearId) {
      const yearDB = await NamHoc.getRepository().findOne({
        where: {
          id: queryParams.yearId,
        },
      });

      year = yearDB.namHoc;

      resultQuery.andWhere({
        namHocId: queryParams.yearId,
      });
    }

    if (queryParams.classId) {
      const classDB = await LopHocPhan.getRepository().findOne({
        where: {
          id: queryParams.classId,
        },
      });

      classSubject = classDB.tenLop;

      resultQuery.andWhere({
        lopHocPhanId: queryParams.classId,
      });
    }

    if (queryParams.examId) {
      const examDB = await KyThi.getRepository().findOne({
        where: {
          id: queryParams.examId,
        },
      });

      exam = examDB.kyThi;

      resultQuery.andWhere({
        kyThiId: queryParams.examId,
      });
    }

    if (queryParams.subjectId) {
      const subjectDB = await HocPhan.getRepository().findOne({
        where: {
          id: queryParams.subjectId,
        },
      });

      subject = subjectDB.hocPhan;

      resultQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.majorId) {
      const majorDB = await Khoa.getRepository().findOne({
        where: {
          id: queryParams.subjectId,
        },
      });

      major = majorDB.khoa;

      const allStudentInMajor = await NguoiDung.getRepository().find({
        where: {
          khoaId: Number(queryParams.majorId),
        },
      });
      resultQuery.andWhere({
        sinhVienId: In(allStudentInMajor.map((student) => student.id)),
      });
    }

    const ketQua = await resultQuery.getMany();

    const buffer = await this.exportPdf.run(ketQua, {
      subject,
      classSubject,
      semester,
      teacher,
      year,
      exam,
      major,
    });

    const s3Service = new S3Service();

    const result = await s3Service.upload(
      buffer,
      payload.filename,
      payload.type,
    );

    return result;
  }
}
