import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { HocPhan } from 'src/entities/HocPhan';
import { KhoaHoc } from 'src/entities/KhoaHoc';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { NguoiDung } from 'src/entities/NguoiDung';
import { SinhVienLopHocPhan } from 'src/entities/SinhVienLopHocPhan';
import { TaiKhoan } from 'src/entities/TaiKhoan';
import { VaiTro } from 'src/entities/VaiTro';
import { S3Service } from 'src/service/s3/s3Service';
import { ILike, In, Not } from 'typeorm';
import * as fs from 'fs';
import * as request from 'request';
import * as path from 'path';

import {
  AddStudentInput,
  AddTeacherInput,
} from './dto/request/addTeacherInput';
import { UploadImageS3 } from './dto/request/uploadImageS3';

@Injectable()
export class UserRepository {
  async getAllTeacher(queryParams: QueryFilterDto) {
    const roleTeacherId = await VaiTro.getRepository().find({
      where: {
        vaiTro: 'Giảng viên',
      },
    });

    const allRoleTeachId = roleTeacherId.map((role) => role.id);

    const getAllAccountTeacher = await TaiKhoan.getRepository().find({
      where: {
        roleId: In(allRoleTeachId),
      },
    });

    const AllAccountTeacherId = getAllAccountTeacher.map(
      (account) => account.id,
    );

    const getTeacherQuery = NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .where({
        taiKhoanId: In(AllAccountTeacherId),
      });

    if (queryParams.subjectId) {
      const allSubject = await HocPhan.getRepository().find({
        where: {
          id: queryParams.subjectId,
        },
      });

      const allSubjectId = allSubject.map((subject) => subject.id);

      const classSubject = await LopHocPhan.getRepository().find({
        where: {
          hocPhanId: In(allSubjectId),
        },
      });

      const allTeacherId = classSubject.map((classe) => classe.giangVienId);
      getTeacherQuery.andWhere({
        id: In(allTeacherId),
      });
    }

    if (queryParams.majorId) {
      getTeacherQuery.andWhere({
        khoaId: queryParams.majorId,
      });
    }

    if (queryParams.q) {
      getTeacherQuery.andWhere({
        hoTen: ILike(queryParams.q),
      });
      getTeacherQuery.orWhere({
        mssv: ILike(queryParams.q),
      });
    }

    return paginate(getTeacherQuery, queryParams);
  }

  async getAllStudent(queryParams: QueryFilterDto) {
    const roleTeacherId = await VaiTro.getRepository().find({
      where: {
        vaiTro: 'Sinh viên',
      },
    });

    const allRoleTeachId = roleTeacherId.map((role) => role.id);

    const getAllAccountTeacher = await TaiKhoan.getRepository().find({
      where: {
        roleId: In(allRoleTeachId),
      },
    });

    const AllAccountTeacherId = getAllAccountTeacher.map(
      (account) => account.id,
    );

    const getTeacherQuery = NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        taiKhoanId: In(AllAccountTeacherId),
      });

    if (queryParams.subjectId) {
      const allSubject = await HocPhan.getRepository().find({
        where: {
          id: queryParams.subjectId,
        },
      });

      const allSubjectId = allSubject.map((subject) => subject.id);

      const classSubject = await LopHocPhan.getRepository().find({
        where: {
          hocPhanId: In(allSubjectId),
        },
      });

      const allClassSubjectId = classSubject.map((subject) => subject.id);

      const studentInClassSubject =
        await SinhVienLopHocPhan.getRepository().find({
          where: {
            lopHocPhanId: In(allClassSubjectId),
          },
        });

      const allStudentInClassSubjectId = studentInClassSubject.map(
        (subject) => subject.sinhVienId,
      );

      getTeacherQuery.andWhere({
        id: In(allStudentInClassSubjectId),
      });
    }

    if (queryParams.majorId) {
      getTeacherQuery.andWhere({
        khoaId: queryParams.majorId,
      });
    }

    if (queryParams.classId) {
      getTeacherQuery.andWhere({
        lopId: queryParams.classId,
      });
    }

    if (queryParams.q) {
      getTeacherQuery.andWhere({
        hoTen: ILike(queryParams.q),
      });
      getTeacherQuery.orWhere({
        mssv: ILike(queryParams.q),
      });
    }

    return paginate(getTeacherQuery, queryParams);
  }

  async getAllStudentWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    console.log('teacherId', teacherId);
    const roleTeacherId = await VaiTro.getRepository().find({
      where: {
        vaiTro: 'Sinh viên',
      },
    });

    const allRoleTeachId = roleTeacherId.map((role) => role.id);

    const getAllAccountTeacher = await TaiKhoan.getRepository().find({
      where: {
        roleId: In(allRoleTeachId),
      },
    });

    const AllAccountTeacherId = getAllAccountTeacher.map(
      (account) => account.id,
    );

    const allClassSubject = await LopHocPhan.getRepository().find({
      where: {
        giangVienId: Number(teacherId),
      },
    });

    console.log('allClassSubject', allClassSubject);

    const allStudent = await SinhVienLopHocPhan.getRepository().find({
      where: {
        lopHocPhanId: In(
          allClassSubject.map((classSubject) => classSubject.id),
        ),
      },
    });

    const allStudentId = allStudent.map((student) => student.sinhVienId);

    const getTeacherQuery = NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        taiKhoanId: In(AllAccountTeacherId),
        id: In(allStudentId),
      });

    if (queryParams.subjectId) {
      const allSubject = await HocPhan.getRepository().find({
        where: {
          id: queryParams.subjectId,
        },
      });

      const allSubjectId = allSubject.map((subject) => subject.id);

      const classSubject = await LopHocPhan.getRepository().find({
        where: {
          hocPhanId: In(allSubjectId),
          giangVienId: Number(teacherId),
        },
      });

      const allClassSubjectId = classSubject.map((subject) => subject.id);

      const studentInClassSubject =
        await SinhVienLopHocPhan.getRepository().find({
          where: {
            lopHocPhanId: In(allClassSubjectId),
          },
        });

      const allStudentInClassSubjectId = studentInClassSubject.map(
        (subject) => subject.sinhVienId,
      );

      getTeacherQuery.andWhere({
        id: In(allStudentInClassSubjectId),
      });
    }

    if (queryParams.majorId) {
      getTeacherQuery.andWhere({
        khoaId: queryParams.majorId,
      });
    }

    if (queryParams.classId) {
      getTeacherQuery.andWhere({
        lopId: queryParams.classId,
      });
    }

    if (queryParams.q) {
      getTeacherQuery.andWhere({
        hoTen: ILike(queryParams.q),
      });
      getTeacherQuery.orWhere({
        mssv: ILike(queryParams.q),
      });
    }

    return paginate(getTeacherQuery, queryParams);
  }

  async getStudentInClass(classId: string, queryParams: QueryFilterDto) {
    const studentInClass = await SinhVienLopHocPhan.getRepository().find({
      where: {
        lopHocPhanId: Number(classId),
      },
    });

    const allStudentId = studentInClass.map(
      (studentInClass) => studentInClass.sinhVienId,
    );

    const nguoiDungQuery = NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        id: In(allStudentId),
      });

    return paginate(nguoiDungQuery, queryParams);
  }

  async getStudentNotInClass(classId: string, queryParams: QueryFilterDto) {
    const studentInClass = await SinhVienLopHocPhan.getRepository().find({
      where: {
        lopHocPhanId: Number(classId),
      },
    });

    const allStudentId = studentInClass.map(
      (studentInClass) => studentInClass.sinhVienId,
    );

    const roleStudentId = await VaiTro.getRepository().find({
      where: {
        vaiTro: 'Sinh viên',
      },
    });

    const allRoleTeachId = roleStudentId.map((role) => role.id);

    const getAllAccountStudent = await TaiKhoan.getRepository().find({
      where: {
        roleId: In(allRoleTeachId),
      },
    });

    const AllAccountStudentId = getAllAccountStudent.map(
      (account) => account.id,
    );

    const nguoiDungQuery = NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        id: Not(In(allStudentId)),
      })
      .andWhere({
        taiKhoanId: In(AllAccountStudentId),
      });

    if (queryParams.classId) {
      nguoiDungQuery.andWhere({
        lopId: queryParams.classId,
      });
    }

    if (queryParams.majorId) {
      nguoiDungQuery.andWhere({
        khoaId: queryParams.majorId,
      });
    }

    if (queryParams.q) {
      nguoiDungQuery.andWhere({
        hoTen: ILike(queryParams.q),
      });
      nguoiDungQuery.orWhere({
        mssv: ILike(queryParams.q),
      });
    }

    return paginate(nguoiDungQuery, queryParams);
  }

  async AddTeacher(payload: AddTeacherInput) {
    const roleTeacher = await VaiTro.getRepository().findOne({
      where: {
        vaiTro: 'Giảng viên',
      },
    });

    const taiKhoan = await TaiKhoan.save(
      TaiKhoan.create({
        roleId: roleTeacher.id,
        username: payload.mssv,
        password: payload.mssv,
      }),
    );

    await NguoiDung.save(
      NguoiDung.create({
        taiKhoanId: taiKhoan.id,
        khoaId: payload.majorId,
        mssv: payload.mssv,
        hoTen: payload.name,
        gioiTinh: payload.gender,
        sdt: payload.phone,
        email: payload.email,
        ngaySinh: payload.birthday,
      }),
    );
  }

  async AddStudent(payload: AddStudentInput) {
    const roleStudent = await VaiTro.getRepository().findOne({
      where: {
        vaiTro: 'Sinh viên',
      },
    });

    const khoaHoc = await KhoaHoc.getRepository().findOne({
      where: {
        id: payload.khoaHocId,
      },
    });

    const taiKhoan = await TaiKhoan.save(
      TaiKhoan.create({
        roleId: roleStudent.id,
        username: payload.mssv,
        password: payload.mssv,
      }),
    );

    await NguoiDung.save(
      NguoiDung.create({
        taiKhoanId: taiKhoan.id,
        khoaId: payload.majorId,
        mssv: payload.mssv,
        hoTen: payload.name,
        gioiTinh: payload.gender,
        sdt: payload.phone,
        email: payload.email,
        ngaySinh: payload.birthday,
        lopId: payload.classId,
        khoaHoc: khoaHoc.khoaHoc,
      }),
    );
  }
  // async getAddUser(payload: AddUserInput) {
  //   const { UserCode, UserName } = payload;
  //   await HocPhan.save(
  //     HocPhan.create({
  //       hocPhan: UserName,
  //       maHocPhan: subjectCode,
  //     }),
  //   );
  // }

  async uploadImage(studentId: string, payload: UploadImageS3) {
    const student = await NguoiDung.getRepository().findOne({
      where: {
        id: Number(studentId),
      },
    });

    const images = payload.files;

    const s3Service = new S3Service();

    for (let i = 0; i < images.length; i++) {
      // console.log(images[i].buffer);

      await s3Service.upload(
        Buffer.from(
          images[i].buffer.replace(/^data:image\/\w+;base64,/, ''),
          'base64',
        ),
        `${images[i].fileName}`,
        images[i].fileType,
      );
    }
  }

  async checkImage(mssv: string) {
    console.log('mssv', mssv);
    const s3Service = new S3Service();
    const i = 5;
    for (let x = 0; x < i; x++) {
      const filePath = `${mssv}_${x}.jpeg`;
      console.log(filePath);
      const isTrue = await s3Service.checkObjectIsExisted(filePath);
      if (isTrue) return true;
    }
    return false;
  }

  async getStudent(studentId: string) {
    const student = await NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        id: Number(studentId),
      })
      .getOne();
    return student;
  }

  async getUser(studentId: string) {
    const student = await NguoiDung.createQueryBuilder()
      .leftJoinAndSelect('NguoiDung.khoa', 'khoa')
      .leftJoinAndSelect('NguoiDung.lop', 'lop')
      .where({
        id: Number(studentId),
      })
      .getOne();
    return student;
  }

  async getImage(mssv: string, classes: string) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let image;
    const download = async (uri, filename, callback) => {
      request.head(uri, async function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        console.log(res.headers);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    await download(
      `http://cb.dut.udn.vn/imagesv/${classes}/${mssv}.jpg?fbclid=IwAR2Y-bpbY6gFIi9-8m67GoP6BtkT6UlK7EJpSwtqhseSjubp-UbSQbS06l0`,
      `${mssv}.jpg`,
      function () {
        image = path.join(__dirname, `../../../${mssv}.jpg`);
      },
    );

    await delay(5000);

    const file = fs.readFileSync(image);
    console.log(file);
    return file;
  }
}
