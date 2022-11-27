import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { getCauHoiInput } from './dto/request/cauHoiParam';
import { CauHoiService } from './cauHoi.service';
import { SubmitInput } from './dto/request/submitInput';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { AddQuestionInput } from './dto/request/addQuestionInput';

@Controller()
export class CauHoiController {
  constructor(private cauHoiService: CauHoiService) {}

  @Get('/question')
  async getAllQuestion(@Query() queryParams: QueryFilterDto) {
    return await this.cauHoiService.getAllQuestion(queryParams);
  }

  @Get('/question/teacher/:teacherId')
  async getAllQuestionWithTeacher(
    @Param('teacherId') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.cauHoiService.getAllQuestionWithTeacher(id, queryParams);
  }

  @Get('/question/:id/answer')
  async getAnswerForQuestion(@Param('id') id: string) {
    return await this.cauHoiService.getAnswerForQuestion(id);
  }

  @Post('/sv/kythi/cauhoi')
  async getCauHoiTrongKyThi(@Body() payload: getCauHoiInput) {
    return await this.cauHoiService.getCauHoiTrongKyThi(payload);
  }

  @Post('/sv/:id/nopbai')
  async submitBaiKiemTra(
    @Param('id') id: string,
    @Body() payload: SubmitInput,
  ) {
    return await this.cauHoiService.submit(id, payload);
  }

  @Post('/addQuestion')
  async addQuestion(@Body() payload: AddQuestionInput) {
    return await this.cauHoiService.addQuestion(payload);
  }
}
