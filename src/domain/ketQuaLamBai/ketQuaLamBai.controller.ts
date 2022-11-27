import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { ExportPDFInput } from './dto/request/exportPDF';
import { KetQuaLamBaiService } from './ketQuaLamBai.service';

@Controller()
export class KetQuaLamBaiController {
  constructor(private kqService: KetQuaLamBaiService) {}

  @Get('/sv/:id/ketqualambai')
  async getKetQuaLamBaiWithSV(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kqService.getKetQuaLamBaiWithSV(id, queryParams);
  }

  @Get('/student/:id/exam/:examId/result')
  async getResultStudentWithSubject(
    @Param('id') studentId: string,
    @Param('examId') examId: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kqService.getResultStudentWithSubject(
      studentId,
      examId,
      queryParams,
    );
  }

  @Get('/result')
  async getAllResult(@Query() queryParams: QueryFilterDto) {
    return await this.kqService.getAllResult(queryParams);
  }

  @Get('/teacher/:teacherId/result')
  async getAllResultWithTeacher(
    @Param('teacherId') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kqService.getAllResultWithTeacher(id, queryParams);
  }

  @Post('/exportResult')
  async exportPDFResult(
    @Body() payload: ExportPDFInput,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kqService.getAllResultPDF(payload, queryParams);
  }

  @Post('/teacher/:teacherId/exportResult')
  async exportPDFResultWithTeacher(
    @Param('teacherId') id: string,
    @Body() payload: ExportPDFInput,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kqService.getAllResultPDFWithTeacher(
      id,
      payload,
      queryParams,
    );
  }
}
