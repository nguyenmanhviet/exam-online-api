import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { HocPhan } from 'src/entities/HocPhan';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { ILike, In } from 'typeorm';
import { AddSubjectInput } from './dto/request/addSubjectInput';

@Injectable()
export class SubjectRepository {
  async getAllSubject(queryParams: QueryFilterDto) {
    const hocPhanQuery = HocPhan.createQueryBuilder();
    if (queryParams.q) {
      hocPhanQuery.where({
        hocPhan: ILike(`%${queryParams.q}%`),
      });
    }
    return paginate(hocPhanQuery, queryParams);
  }

  async getAddSubject(payload: AddSubjectInput) {
    const { subjectCode, subjectName } = payload;
    await HocPhan.save(
      HocPhan.create({
        hocPhan: subjectName,
        maHocPhan: subjectCode,
      }),
    );
  }
}
