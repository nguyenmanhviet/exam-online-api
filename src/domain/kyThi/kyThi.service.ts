import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddExamInput } from './dto/request/addExamInput';
import { KyThiRepository } from './kyThi.repository';

@Injectable()
export class KyThiService {
  constructor(private kyThiRepo: KyThiRepository) {}

  async getKyThiWithSV(id: string, queryParams: QueryFilterDto) {
    return await this.kyThiRepo.getKyThiWithSV(id, queryParams);
  }

  async getAllExam(queryParams: QueryFilterDto) {
    return await this.kyThiRepo.getAllExam(queryParams);
  }

  async getAllExamWithTeacher(teacherId: string, queryParams: QueryFilterDto) {
    return await this.kyThiRepo.getAllExamWithTeacher(teacherId, queryParams);
  }

  async addExam(payload: AddExamInput) {
    console.log(payload);
    await this.kyThiRepo.addExam(payload);
    return {
      message: 'Add exam successfully',
      success: true,
    };
  }
}
