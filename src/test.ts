// import { DynamicModule } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { writeFileSync } from 'fs';
// import { CVExportProcess } from './service/exportPDF';
// import { S3Service } from './service/s3/s3Service';
// import { ResultService } from './service/table';

// async function runTest() {
//   const app = await NestFactory.createApplicationContext({
//     module: Object,
//     providers: [CVExportProcess, ResultService, S3Service],
//   } as DynamicModule);

//   const exporter = app.get(CVExportProcess);
//   // const s3Service = app.get(S3Service);

//   const buffer = await exporter.run();

//   const s3Service = new S3Service();

//   const url = await s3Service.upload(buffer, `test.pdf`, 'application/pdf');

//   console.log(url);

//   writeFileSync('/tmp/test.pdf', buffer);
//   await app.close();
// }

// runTest();
