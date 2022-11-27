import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddSubjectInput } from './dto/request/addSubjectInput';
import { SubjectService } from './subject.service';

@Controller()
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get('/subject')
  async getAllSubject(@Query() queryParams: QueryFilterDto) {
    return await this.subjectService.getAllSubject(queryParams);
  }

  @Post('/addSubject')
  async addSubject(@Body() payload: AddSubjectInput) {
    return await this.subjectService.getAddSubject(payload);
  }
}
