import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddSubjectInput } from './dto/request/addSubjectInput';
import { SubjectRepository } from './subject.repository';

@Injectable()
export class SubjectService {
  constructor(private subjectRepo: SubjectRepository) {}

  async getAllSubject(queryParams: QueryFilterDto) {
    return await this.subjectRepo.getAllSubject(queryParams);
  }

  async getAddSubject(payload: AddSubjectInput) {
    await this.subjectRepo.getAddSubject(payload);
    return {
      success: true,
      message: 'Update successfully',
    };
  }
}
