import { Controller, Get } from '@nestjs/common';
import { YearService } from './year.service';

@Controller()
export class YearController {
  constructor(private yearService: YearService) {}
  @Get('/year')
  async getYear() {
    return await this.yearService.getYear();
  }

  @Get('/khoaHoc')
  async getKhoaHoc() {
    return await this.yearService.getKhoaHoc();
  }

  @Get('/semester')
  async getSemester() {
    return await this.yearService.getSemester();
  }

  @Get('/levelQuestion')
  async getLevelQuestion() {
    return await this.yearService.getLevelQuestion();
  }

  @Get('/observation')
  async getObservation() {
    return await this.yearService.getObservation();
  }

  @Get('/class')
  async getClass() {
    return await this.yearService.getClass();
  }

  @Get('/major')
  async getMajor() {
    return await this.yearService.getMajor();
  }

  @Get('/role')
  async getRole() {
    return await this.yearService.getRole();
  }
}
