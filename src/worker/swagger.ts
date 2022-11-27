import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger({ app }: { app: INestApplication }) {
  const swaggerUrl = '/';

  console.log(swaggerUrl);
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      `
    Basic api query use for findAll API. Only support normal query if need complex or advanced use cases(fulltextsearch, geolocation...) contact server developers to support more.
    - Paginate with limit and offset. Ex: ?limit=10&page=1
    - Order by fields and order reverse use prefix "ASC or DESC".  Ex: ?orderBy=createdAt:DESC
    - Filter equal ?filter={"name": {"$eq": "Jayce"}}
    - Filter not equal ?filter={"name": {"$neq": "Jayce"}}
    - Filter less than ?filter={"age": {"$lt": 40}}
    - Filter greater than ?filter={"age": {"$gt": 20}}
    - Filter less than and equal ?filter={"age": {"$lte": 40}}
    - Filter greater than equal ?filter={"age": {"$gte": 20}}
    - Filter field in many choice ?filter={"name": {"$in": ["Alex", "Julia"]}}
    - Filter field not in many choice ?filter={"name": {"$nin": ["Alex", "Julia"]}}
    - Filter field by text ?filter={"name": {"$like": "%jay%"}}
    - Query by text ?q=abcxyz
    `,
    )
    .setVersion('1.0')
    .addServer(swaggerUrl)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/exam-online/documentation`, app, document);
}
