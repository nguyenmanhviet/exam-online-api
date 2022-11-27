import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddExamInput } from './dto/request/addExamInput';
import { KyThiService } from './kyThi.service';

@Controller()
export class KyThiController {
  constructor(private kyThiService: KyThiService) {}

  @Get('/sv/:id/kythi')
  async getKyThiWithSV(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kyThiService.getKyThiWithSV(id, queryParams);
  }

  @Get('/exam')
  async getAllExam(@Query() queryParams: QueryFilterDto) {
    return await this.kyThiService.getAllExam(queryParams);
  }

  @Get('/exam/teacher/:teacherId')
  async getAllExamWithTeacher(
    @Param('teacherId') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.kyThiService.getAllExamWithTeacher(id, queryParams);
  }

  @Post('/addExam')
  async addExam(@Body() payload: AddExamInput) {
    console.log(payload);

    payload = {
      ...payload,
      timeEnd: new Date(
        new Date(payload.timeEnd).getTime() + 7 * 60 * 60 * 1000,
      ),
      timeStart: new Date(
        new Date(payload.timeStart).getTime() + 7 * 60 * 60 * 1000,
      ),
    };
    return await this.kyThiService.addExam(payload);
  }
}
