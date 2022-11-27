import * as path from 'path';
import * as fs from 'fs';
import { URL } from 'url';
import { Endpoint, S3 } from 'aws-sdk';

import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  bucket: string;
  s3: S3;
  bucketUrl: string;

  constructor() {
    let s3Config: S3.ClientConfiguration;
    this.bucket = 'exam-online-pdf';

    try {
      s3Config = {
        params: { Bucket: this.bucket },
        // s3ForcePathStyle: true,
        accessKeyId: 'AKIA6PXUR5ATAWHI2CC4', // This specific key is required when working offline
        secretAccessKey: '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',
        region: 'ap-southeast-2',
      };
    } catch (error) {
      console.log(error);
    }
    this.s3 = new S3(s3Config);
  }

  async deleteFile(url: string) {
    const words = url.split('/');
    return await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: words[words.length - 1],
      })
      .promise();
  }

  async getBufferObject(fileName: string) {
    try {
      const s3Params = {
        Bucket: this.bucket,
        Key: fileName,
      };
      return this.s3.getObject(s3Params).promise();
    } catch (err) {
      console.log('s3 getObject failed');
      throw new HttpException(err as Error, 404);
    }
  }

  async checkObjectIsExisted(filePath: string) {
    try {
      const s3Params = {
        Bucket: this.bucket,
        Key: filePath,
      };
      const output = await this.s3.headObject(s3Params).promise();
      console.log('output', output);
      return true;
    } catch (err) {
      console.log('File not Found ERROR');
      return false;
    }
  }

  async upload(
    body: S3.Body,
    fileName: string,
    fileType: string,
  ): Promise<string> {
    const s3Params: S3.PutObjectRequest = {
      Key: fileName,
      Body: body,
      Bucket: this.bucket,
      ContentEncoding: 'base64',
      ContentType: fileType,
      ACL: 'public-read',
    };
    try {
      return new Promise((resolve, reject) => {
        this.s3.upload(
          s3Params,
          (err: Error, data: S3.ManagedUpload.SendData) => {
            if (err) {
              reject(err);
            } else {
              resolve(data as unknown as string);
            }
          },
        );
      });
    } catch (err) {
      console.log('s3 upload failed');
      throw new HttpException(err as Error, 404);
    }
  }

  async putImage(body: S3.Body, fileName: string): Promise<string> {
    const s3Params: S3.PutObjectRequest = {
      Key: fileName,
      Body: body,
      Bucket: this.bucket,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };
    try {
      return new Promise((resolve, reject) => {
        this.s3.putObject(
          s3Params,
          (err: Error, data: S3.ManagedUpload.SendData) => {
            if (err) {
              reject(err);
            } else {
              resolve(data as unknown as string);
            }
          },
        );
      });
    } catch (err) {
      console.log('s3 upload failed');
      throw new HttpException(err as Error, 404);
    }
  }

  getSignedUrl({
    pathFile,
    fileType,
  }: {
    pathFile: string;
    fileType: string;
  }): Promise<string> {
    const s3Params = {
      Bucket: this.bucket,
      Key: pathFile,
      ACL: 'public-read',
      ContentType: fileType,
      Expires: 5 * 60, //time to expire in seconds (6 minutes)
    };
    try {
      return new Promise((resolve, reject) => {
        this.s3.getSignedUrl(
          'putObject',
          s3Params,
          (err: Error, url: string) => {
            if (err) {
              reject(err);
            } else {
              resolve(url);
            }
          },
        );
      });
    } catch (err) {
      throw new HttpException(err as Error, 404);
    }
  }

  getStreamObject(fileName: string) {
    try {
      const s3Params = {
        Bucket: this.bucket,
        Key: fileName,
      };
      return this.s3.getObject(s3Params).createReadStream();
    } catch (err) {
      console.log('s3 getObject failed');
      throw new HttpException(err as Error, 404);
    }
  }

  getFileUrl(fileKey: string) {
    return this.bucketUrl.includes(`http`)
      ? `${this.bucketUrl}/${fileKey}`
      : `https://${this.bucketUrl}/${fileKey}`;
  }
}
