import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';

@Module({
  providers: [SubjectRepository, SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
