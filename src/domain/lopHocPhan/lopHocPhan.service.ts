import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddClassSubjectInput } from './dto/request/addClassSubjectInput';
import { AddClassSubjectToExam } from './dto/request/addClassSubjectToExam';
import { AddStudentToClassInput } from './dto/request/addStudentToClassInput';
import { LopHocPhanRepository } from './lopHocPhan.repository';

@Injectable()
export class LopHocPhanService {
  constructor(private lopHocPhanRepo: LopHocPhanRepository) {}

  async getLopHocphanWithSV(id: string, queryParams: QueryFilterDto) {
    return await this.lopHocPhanRepo.getLopHocphanWithSV(id, queryParams);
  }

  async getAllClassSubject(queryParams: QueryFilterDto) {
    return await this.lopHocPhanRepo.getAllClassSubject(queryParams);
  }

  async getAllClassSubjectWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    return await this.lopHocPhanRepo.getAllClassSubjectWithTeacher(
      teacherId,
      queryParams,
    );
  }

  async addStudentToClass(classId: string, payload: AddStudentToClassInput) {
    await this.lopHocPhanRepo.addStudentToClass(classId, payload);
    return {
      success: true,
      message: 'Add student successfully',
    };
  }

  async addClassSubject(payload: AddClassSubjectInput) {
    await this.lopHocPhanRepo.AddClassSubject(payload);
    return {
      success: true,
      message: 'Add student successfully',
    };
  }

  async getClassSubjectInExam(examId: string, queryParams: QueryFilterDto) {
    return await this.lopHocPhanRepo.getClassSubjectInExam(examId, queryParams);
  }

  async getClassSubjectNotInExam(examId: string, queryParams: QueryFilterDto) {
    return await this.lopHocPhanRepo.getClassSubjectNotInExam(
      examId,
      queryParams,
    );
  }

  async addClassSubjectToExam(examId: string, payload: AddClassSubjectToExam) {
    await this.lopHocPhanRepo.addClassSubjectToExam(examId, payload);
    return {
      success: true,
      message: 'Add classSubject successfully',
    };
  }
}
