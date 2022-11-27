import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { CauHoiRepository } from './cauHoi.repository';
import { AddQuestionInput } from './dto/request/addQuestionInput';
import { getCauHoiInput } from './dto/request/cauHoiParam';
import { SubmitInput } from './dto/request/submitInput';

@Injectable()
export class CauHoiService {
  constructor(private cauHoiRepo: CauHoiRepository) {}

  async getAnswerForQuestion(questionId: string) {
    return await this.cauHoiRepo.getAnswerForQuestion(questionId);
  }

  async getAllQuestion(queryParams: QueryFilterDto) {
    return await this.cauHoiRepo.getAllQuestion(queryParams);
  }

  async getAllQuestionWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    return await this.cauHoiRepo.getAllQuestionWithTeacher(
      teacherId,
      queryParams,
    );
  }

  async getCauHoiTrongKyThi(payload: getCauHoiInput) {
    return await this.cauHoiRepo.getCauHoiTrongKyThi(payload);
  }

  async submit(sinhVienId: string, payload: SubmitInput) {
    console.log(payload);
    return await this.cauHoiRepo.submit(sinhVienId, payload);
  }

  async addQuestion(payload: AddQuestionInput) {
    await this.cauHoiRepo.addQuestion(payload);
    return {
      success: true,
      message: 'Add Question successfully',
    };
  }
}
