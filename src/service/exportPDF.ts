/* eslint-disable max-lines-per-function */
import { Injectable } from '@nestjs/common';
import jsPDF from 'jspdf';
import { FONT_BLISSPRO_BOLD } from './pdf/fonts/blissProBold.font';
import { FONT_BLISSPRO_NORMAL } from './pdf/fonts/blissProNormal.font';
import { ResultService } from './table';

export class payloadPDF {
  subject: string;
  classSubject: string;
  semester: string;
  teacher: string;
  year: string;
  exam: string;
  major: string;
}

@Injectable()
export class CVExportProcess {
  constructor(private resultTable: ResultService) {}
  async run(ketQua: any, payload: payloadPDF) {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      compress: true,
    });

    doc.addFileToVFS('BlissPro-normal.ttf', FONT_BLISSPRO_BOLD);
    doc.addFont('BlissPro-bold.ttf', 'BlissPro', 'bold');

    doc.setFontSize(10);
    doc.setFont('BlissPro', 'bold');
    doc.text('SỞ GIÁO DỤC & ĐÀO TẠO TP. ĐÀ NẴNG', 40, 10);
    doc.text('ĐẠI HỌC BÁCH KHOA ĐÀ NẴNG', 45, 15);
    doc.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 190, 10);
    doc.text('Độc lập - Tự do - Hạnh phúc', 200, 15);

    doc.text('DANH SÁCH KẾT QUẢ KIỂM TRA SINH VIÊN', 115, 20);

    doc.text(`Học phần: ${payload.subject}`, 10, 25);
    doc.text(`Lớp học phần: ${payload.classSubject}`, 100, 25);
    doc.text(`Kỳ thi: ${payload.exam}`, 10, 30);
    doc.text(`Học kỳ: ${payload.semester}`, 100, 30);
    doc.text(`Năm học: ${payload.year}`, 190, 30);
    doc.text(`Giảng viên: ${payload.teacher}`, 10, 35);
    doc.text(`Khoa: ${payload.major}`, 100, 35);

    await this.resultTable.buildResultTable(doc, ketQua);

    const buffer = doc.output('arraybuffer');
    return Buffer.from(buffer);
  }
}
