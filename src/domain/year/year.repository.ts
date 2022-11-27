import { Injectable } from '@nestjs/common';
import { CachThucGiamSat } from 'src/entities/CachThucGiamSat';
import { HocKy } from 'src/entities/HocKy';
import { Khoa } from 'src/entities/Khoa';
import { KhoaHoc } from 'src/entities/KhoaHoc';
import { Lop } from 'src/entities/Lop';
import { MucDoCauHoi } from 'src/entities/MucDoCauHoi';
import { NamHoc } from 'src/entities/NamHoc';
import { VaiTro } from 'src/entities/VaiTro';

@Injectable()
export class YearRepository {
  async getYear() {
    return await NamHoc.find();
  }

  async getKhoaHoc() {
    return await KhoaHoc.find();
  }

  async getRole() {
    return await VaiTro.find();
  }

  async getSemester() {
    return await HocKy.find();
  }

  async getLevelQuestion() {
    return await MucDoCauHoi.find();
  }

  async getObservation() {
    return await CachThucGiamSat.find();
  }

  async getClass() {
    return await Lop.find();
  }

  async getMajor() {
    return await Khoa.find();
  }
}
