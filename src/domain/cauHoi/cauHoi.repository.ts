import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { CauHoi } from 'src/entities/CauHoi';
import { DapAn } from 'src/entities/DapAn';
import { KetQuaLamBai } from 'src/entities/KetQuaLamBai';
import { LopHocPhan } from 'src/entities/LopHocPhan';
import { ILike, In } from 'typeorm';
import { AddQuestionInput } from './dto/request/addQuestionInput';
import { getCauHoiInput } from './dto/request/cauHoiParam';
import { SubmitInput } from './dto/request/submitInput';
import { CauHoiResponse } from './dto/response/cauHoiResponse';

@Injectable()
export class CauHoiRepository {
  async getAllQuestion(queryParams: QueryFilterDto) {
    const getAllQuestionQuery = CauHoi.createQueryBuilder()
      .leftJoinAndSelect('CauHoi.hocPhan', 'hocPhan')
      .leftJoinAndSelect('CauHoi.mucDoCauHoi', 'mucDoCauHoi');

    if (queryParams.subjectId) {
      getAllQuestionQuery.where({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      getAllQuestionQuery.andWhere({
        tenCauHoi: ILike(queryParams.q),
      });
      getAllQuestionQuery.orWhere({
        cauHoi: ILike(queryParams.q),
      });
    }
    return paginate(getAllQuestionQuery, queryParams);
  }

  async getAllQuestionWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    const allClassSubject = await LopHocPhan.getRepository().find({
      where: {
        giangVienId: Number(teacherId),
      },
    });

    const allSubjectId = allClassSubject.map(
      (classSubject) => classSubject.hocPhanId,
    );

    const getAllQuestionQuery = CauHoi.createQueryBuilder()
      .leftJoinAndSelect('CauHoi.hocPhan', 'hocPhan')
      .leftJoinAndSelect('CauHoi.mucDoCauHoi', 'mucDoCauHoi')
      .where({
        hocPhanId: In(allSubjectId),
      });

    if (queryParams.subjectId) {
      getAllQuestionQuery.andWhere({
        hocPhanId: queryParams.subjectId,
      });
    }

    if (queryParams.q) {
      getAllQuestionQuery.andWhere({
        tenCauHoi: ILike(queryParams.q),
      });
      getAllQuestionQuery.orWhere({
        cauHoi: ILike(queryParams.q),
      });
    }
    return paginate(getAllQuestionQuery, queryParams);
  }

  async getCauHoiTrongKyThi(payload: getCauHoiInput) {
    const { hocPhanId, soLuongCauHoi } = payload;

    const cauHoiTrongHocPhan: CauHoi[] = await CauHoi.query(`SELECT TOP (${
      soLuongCauHoi ?? 40
    }) [id]
    ,[hocPhanId]
    ,[mucDoCauHoiId]
    ,[cauHoi]
     FROM [examOnline].[dbo].[CauHoi]
     WHERE [hocPhanId] = ${hocPhanId ?? 1} 
     ORDER BY NEWID()`);

    const cauHoiIdArray = cauHoiTrongHocPhan.map((ch) => ch.id);

    const dapAnListTrongCauHoi = await DapAn.getRepository().find({
      where: {
        cauHoiId: In(cauHoiIdArray),
      },
    });

    const result: CauHoiResponse[] = [];

    cauHoiTrongHocPhan.forEach((ch) => {
      result.push({
        ...ch,
      });
    });

    result.forEach((ch) => {
      dapAnListTrongCauHoi.forEach((da) => {
        if (da.cauHoiId == ch.id) {
          if (ch.dapAn) {
            ch.dapAn.push(da);
          } else {
            ch.dapAn = [da];
          }
        }
      });
    });

    return result;
  }

  async submit(sinhVienId: string, payload: SubmitInput) {
    const { answer } = payload;
    const dapAn = await DapAn.getRepository().find({
      where: {
        id: In(answer),
      },
    });
    const soCauDung = dapAn.filter((da) => da.dapAnDung).length;
    const ketQua = await KetQuaLamBai.save({
      ...payload,
      sinhVienId: Number(sinhVienId),
      soCauDung,
    });

    const ketQuaLamBai = KetQuaLamBai.createQueryBuilder()
      .leftJoinAndSelect('KetQuaLamBai.hocPhan', 'hocPhan')
      .leftJoinAndSelect('KetQuaLamBai.namHoc', 'namHoc')
      .leftJoinAndSelect('KetQuaLamBai.hocKy', 'hocKy')
      .leftJoinAndSelect('KetQuaLamBai.lopHocPhan', 'lopHocPhan')
      .leftJoinAndSelect('KetQuaLamBai.kyThi', 'kyThi')
      .where({
        id: ketQua.id,
      })
      .getOne();

    return ketQuaLamBai;
  }

  async getAnswerForQuestion(questionId: string) {
    return await DapAn.getRepository().find({
      where: {
        cauHoiId: Number(questionId),
      },
    });
  }

  async addQuestion(payload: AddQuestionInput) {
    const cauHoi = await CauHoi.save({
      hocPhanId: payload.subjectId,
      mucDoCauHoiId: payload.levelQuestionId,
      tenCauHoi: payload.questionName,
      cauHoi: payload.question,
    });

    const record = payload.answers.map((answer) => ({
      cauHoiId: cauHoi.id,
      dapAn: answer.answer,
      dapAnDung: answer.isCorrect,
    }));

    await DapAn.createQueryBuilder()
      .insert()
      .into(DapAn)
      .values(record)
      .execute();
  }
}
