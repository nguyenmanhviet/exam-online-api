import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { ExportPDFInput } from './dto/request/exportPDF';
import { KetQuaLamBaiRepository } from './ketQuaLamBai.repository';

@Injectable()
export class KetQuaLamBaiService {
  constructor(private kqRepo: KetQuaLamBaiRepository) {}

  async getKetQuaLamBaiWithSV(id: string, queryParams: QueryFilterDto) {
    return await this.kqRepo.getKetQuaLamBaiWithSV(id, queryParams);
  }
  async getResultStudentWithSubject(
    studentId: string,
    examId: string,
    queryParams: QueryFilterDto,
  ) {
    return await this.kqRepo.getResultStudentWithSubject(
      studentId,
      examId,
      queryParams,
    );
  }

  async getAllResult(queryParams: QueryFilterDto) {
    return await this.kqRepo.getAllResult(queryParams);
  }

  async getAllResultPDF(payload: ExportPDFInput, queryParams: QueryFilterDto) {
    return await this.kqRepo.getAllResultPDF(payload, queryParams);
  }

  async getAllResultPDFWithTeacher(
    teacherId: string,
    payload: ExportPDFInput,
    queryParams: QueryFilterDto,
  ) {
    return await this.kqRepo.getAllResultPDFWithTeacher(
      teacherId,
      payload,
      queryParams,
    );
  }

  async getAllResultWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    return await this.kqRepo.getAllResultWithTeacher(teacherId, queryParams);
  }
}
