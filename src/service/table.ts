import { Injectable } from '@nestjs/common';
import { RowInput, UserOptions } from 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { Lop } from 'src/entities/Lop';
import { Khoa } from 'src/entities/Khoa';

export enum LABEL {
  STT = 'STT',
  NAME = 'Họ và tên',
  MSSV = 'Mã số sinh viên',
  CLASS = 'Lớp',
  MAJOR = 'Khoa',
  DAY = 'Ngày sinh',
  GENDER = 'Giới tính',
  QUESTION = 'Số câu hỏi',
  ANSWER = 'Số câu đúng',
  FINE = 'Số lần vi phạm',
  NOTE = 'Ghi chú',
  SIGN = 'Chữ ký',
}

export enum PDFColor {
  CommonFillColor = '#fff',
  CommonLineColor = 'black',
  HeaderFillColor = '#6DA0CB',
  HeaderTextColor = 'white',
  HeaderLineColor = 'black',
  EditableFillColor = '#ffefb0',
}

export const generateCommonTableConfig = (): Partial<UserOptions> => ({
  theme: 'grid',
  showHead: 'firstPage',
  styles: {
    font: 'BlissPro',
    fontStyle: 'normal',
    halign: 'right',
    lineWidth: 0.2,
    fontSize: 7.5,
    cellPadding: 0.5,
    fillColor: PDFColor.CommonFillColor,
    lineColor: PDFColor.CommonLineColor,
    // cellWidth: 18,
  },
  headStyles: {
    fillColor: PDFColor.HeaderFillColor,
    lineColor: PDFColor.HeaderLineColor,
    textColor: PDFColor.HeaderTextColor,
    fontStyle: 'bold',
    halign: 'center',
    valign: 'middle',
  },
  columnStyles: {
    // rowId: {
    //   halign: 'center',
    //   cellWidth: 3,
    // },
    // label: {
    //   halign: 'left',
    //   cellWidth: 40,
    // },
  },
});

// export const headers: RowInput[] = [
//   [{ title: 'Danh sách điểm thi', colSpan: 11 }],
// ];

@Injectable()
export class ResultService {
  async buildResultTable(doc: jsPDF, result: any) {
    const headers = this.normalizeDataHeader();
    const body = await this.normalizeData(result);
    autoTable(doc, {
      ...generateCommonTableConfig(),
      margin: { left: 10, right: 10, top: 40 },
      head: headers,
      columnStyles: {
        [LABEL.STT]: {
          halign: 'center',
          cellWidth: 8,
          fontStyle: 'bold',
        },
        [LABEL.NAME]: {
          halign: 'center',
          cellWidth: 40,
          fontStyle: 'bold',
        },
        [LABEL.MSSV]: {
          halign: 'center',
          cellWidth: 20,
          fontStyle: 'bold',
        },
        [LABEL.CLASS]: {
          halign: 'center',
          cellWidth: 15,
          fontStyle: 'bold',
        },
        [LABEL.MAJOR]: {
          halign: 'center',
          cellWidth: 40,
          fontStyle: 'bold',
        },
        [LABEL.DAY]: {
          halign: 'center',
          cellWidth: 18,
          fontStyle: 'bold',
        },
        [LABEL.GENDER]: {
          halign: 'center',
          cellWidth: 15,
        },
        [LABEL.QUESTION]: {
          halign: 'center',
        },
        [LABEL.ANSWER]: {
          halign: 'center',
        },
        [LABEL.FINE]: {
          halign: 'center',
        },
        [LABEL.NOTE]: {
          halign: 'center',
          cellWidth: 30,
        },
        [LABEL.SIGN]: {
          halign: 'center',
        },
      },
      rowPageBreak: 'avoid',
      //   columns: Object.values(PROJECT_STATUS_COLUMN).map((label) => ({
      //     dataKey: label,
      //   })),
      columns: Object.values(LABEL).map((label) => ({ dataKey: label })),
      body: body,
    });
  }

  private normalizeDataHeader(): RowInput[] {
    return [
      [
        {
          title: 'STT',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Họ và tên',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Mã số sinh viên',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Lớp',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Khoa',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Ngày sinh',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Giới tính',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Kết quả làm bài',
          colSpan: 3,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Ghi chú',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Chữ ký',
          rowSpan: 2,
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
      ],
      [
        {
          title: 'Số câu hỏi',
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Số câu đúng',
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
        {
          title: 'Số lần vi phạm',
          styles: {
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
          },
        },
      ],
    ];
  }

  private async normalizeData(data: any[]): Promise<RowInput[]> {
    return Promise.all(
      data.map(async (ev, idx) => {
        const classStudent = await Lop.getRepository().findOne({
          where: {
            id: ev.sinhVien.lopId,
          },
        });

        const major = await Khoa.getRepository().findOne({
          where: {
            id: ev.sinhVien.khoaId,
          },
        });
        return {
          [LABEL.STT]: (idx + 1).toString(),
          [LABEL.NAME]: ev.sinhVien.hoTen,
          [LABEL.MSSV]: ev.sinhVien.mssv,
          [LABEL.CLASS]: classStudent.lop,
          [LABEL.MAJOR]: major.khoa,
          [LABEL.DAY]: ev.sinhVien.ngaySinh,
          [LABEL.GENDER]: ev.sinhVien.gioiTinh ? 'Nam' : 'Nữ',
          [LABEL.QUESTION]: ev.tongSoCauHoi.toString(),
          [LABEL.ANSWER]: ev.soCauDung.toString(),
          [LABEL.FINE]: ev.soLanViPham.toString(),
          [LABEL.NOTE]: '',
          [LABEL.SIGN]: '...',
        };
      }),
    );
  }
}
