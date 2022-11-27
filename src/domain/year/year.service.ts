import { Injectable } from '@nestjs/common';
import { YearRepository } from './year.repository';

@Injectable()
export class YearService {
  constructor(private yearRepo: YearRepository) {}

  async getYear() {
    return await this.yearRepo.getYear();
  }

  async getKhoaHoc() {
    return await this.yearRepo.getKhoaHoc();
  }

  async getRole() {
    return await this.yearRepo.getRole();
  }

  async getSemester() {
    return await this.yearRepo.getSemester();
  }

  async getLevelQuestion() {
    return await this.yearRepo.getLevelQuestion();
  }

  async getObservation() {
    return await this.yearRepo.getObservation();
  }

  async getClass() {
    return await this.yearRepo.getClass();
  }

  async getMajor() {
    return await this.yearRepo.getMajor();
  }
}
