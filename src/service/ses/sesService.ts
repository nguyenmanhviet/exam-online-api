import { Injectable } from '@nestjs/common';

import AWS, { SES } from 'aws-sdk';

@Injectable()
export class SESService {
  /**
   * Method to send email without attachments
   * @param email
   * @returns
   */
  async sendEmail(mssv: string) {
    const ses = new SES({
      accessKeyId: 'AKIA6PXUR5ATAWHI2CC4', // This specific key is required when working offline
      secretAccessKey: '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',
      region: 'ap-southeast-2',
    });
    const sesParams = {
      Destination: {
        ToAddresses: ['thidaihoc29012000@gmail.com'],
      },
      Message: {
        Subject: {
          Data: 'Sinh viên vi phạm',
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `Sinh viên có mã số sinh viên ${mssv} đã vi phạm khi nhờ người khác lấy dữ liệu hình ảnh.`,
            Charset: 'UTF-8',
          },
        },
      },
      Source: `vietmanh.nguyen@team.enouvo.com`,
    } as SES.Types.SendEmailRequest;
    const sendPromise = await ses.sendEmail(sesParams).promise();
    return sendPromise;
  }
}
