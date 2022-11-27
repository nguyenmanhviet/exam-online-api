import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddClassSubjectInput } from './dto/request/addClassSubjectInput';
import { AddClassSubjectToExam } from './dto/request/addClassSubjectToExam';
import { AddStudentToClassInput } from './dto/request/addStudentToClassInput';
import { LopHocPhanService } from './lopHocPhan.service';

@Controller()
export class LopHocPhanController {
  constructor(private lopHocPhanService: LopHocPhanService) {}

  @Get('/sv/:id/lophocphan')
  async getLopHocphanWithSV(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.lopHocPhanService.getLopHocphanWithSV(id, queryParams);
  }

  @Get('/classSubject')
  async getAllClassSubject(@Query() queryParams: QueryFilterDto) {
    return await this.lopHocPhanService.getAllClassSubject(queryParams);
  }

  @Get('/classSubject/teacher/:teacherId')
  async getAllClassSubjectWithTeacher(
    @Param('teacherId') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.lopHocPhanService.getAllClassSubjectWithTeacher(
      id,
      queryParams,
    );
  }

  @Post('/classSubject/:id/addStudent')
  async addStudentToClass(
    @Param('id') id: string,
    @Body() payload: AddStudentToClassInput,
  ) {
    return await this.lopHocPhanService.addStudentToClass(id, payload);
  }

  @Post('/addClassSubject')
  async addClassSubject(@Body() payload: AddClassSubjectInput) {
    return await this.lopHocPhanService.addClassSubject(payload);
  }

  @Get('/exam/:id/classSubject')
  async getClassSubjectInExam(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.lopHocPhanService.getClassSubjectInExam(id, queryParams);
  }

  @Get('/notInExam/:id/classSubject')
  async getClassSubjectNotInExam(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.lopHocPhanService.getClassSubjectNotInExam(
      id,
      queryParams,
    );
  }

  @Post('/exam/:id/addClassSubject')
  async addClassSubjectToExam(
    @Param('id') id: string,
    @Body() payload: AddClassSubjectToExam,
  ) {
    return await this.lopHocPhanService.addClassSubjectToExam(id, payload);
  }
}
