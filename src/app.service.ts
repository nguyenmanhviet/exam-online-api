import { Injectable } from '@nestjs/common';
import { HocPhan } from './entities/HocPhan';
import { TaiKhoan } from './entities/TaiKhoan';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const hocPhan = await TaiKhoan.getRepository().find({
      where: {
        id: 1,
      },
      relations: ['vaiTro'],
    });
    console.log('hocPhan', hocPhan);
    return 'Hello World!';
  }
}
