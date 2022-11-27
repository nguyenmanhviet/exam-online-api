import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { NguoiDung } from 'src/entities/NguoiDung';
import { TaiKhoan } from 'src/entities/TaiKhoan';
import { ILike, In } from 'typeorm';
import { LoginInput } from './dto/request/loginInput';
import { LoginResponse } from './dto/response/loginResponse';

@Injectable()
export class TaiKhoanRepository {
  async login(payload: LoginInput): Promise<LoginResponse> {
    const { username, password } = payload;
    const taiKhoan = await TaiKhoan.getRepository().findOne({
      where: {
        username,
      },
      relations: ['vaiTro'],
    });

    console.log('TaiKhoan', taiKhoan);

    if (!taiKhoan || taiKhoan.password != password) {
      throw new NotFoundException(`invalid username/password`);
    }

    const nguoiDung = await NguoiDung.getRepository().findOne({
      where: {
        taiKhoanId: taiKhoan.id,
      },
    });

    return {
      userId: nguoiDung?.id ?? -1,
      role: taiKhoan.vaiTro.vaiTro,
      success: true,
      message: 'Login successfully',
    };
  }

  async getAllAccount(queryParams: QueryFilterDto) {
    const accountQuery = NguoiDung.createQueryBuilder().leftJoinAndSelect(
      'NguoiDung.taiKhoan',
      'taiKhoan',
    );

    if (queryParams.roleId) {
      const accounts = await TaiKhoan.getRepository().find({
        where: {
          roleId: queryParams.roleId,
        },
      });
      accountQuery.andWhere({
        taiKhoanId: In(accounts.map((account) => account.id)),
      });
    }
    if (queryParams.q) {
      accountQuery.andWhere({
        hoTen: ILike(queryParams.q),
      });
      // accountQuery.orWhere({
      //   password: ILike(queryParams.q),
      // });
    }

    return paginate(accountQuery, queryParams);
  }
}
