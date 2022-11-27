import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import {
  AddStudentInput,
  AddTeacherInput,
} from './dto/request/addTeacherInput';
import { UploadImageS3 } from './dto/request/uploadImageS3';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getAllTeacher(queryParams: QueryFilterDto) {
    return await this.userRepo.getAllTeacher(queryParams);
  }

  async getAllStudent(queryParams: QueryFilterDto) {
    return await this.userRepo.getAllStudent(queryParams);
  }

  async getAllStudentWithTeacher(
    teacherId: string,
    queryParams: QueryFilterDto,
  ) {
    return await this.userRepo.getAllStudentWithTeacher(teacherId, queryParams);
  }

  async getStudentInClass(classId: string, queryParams: QueryFilterDto) {
    return await this.userRepo.getStudentInClass(classId, queryParams);
  }

  async getStudentNotInClass(classId: string, queryParams: QueryFilterDto) {
    return await this.userRepo.getStudentNotInClass(classId, queryParams);
  }

  async AddTeacher(payload: AddTeacherInput) {
    await this.userRepo.AddTeacher(payload);
    return {
      success: true,
      message: 'Add Teacher successfully',
    };
  }

  async AddStudent(payload: AddStudentInput) {
    await this.userRepo.AddStudent(payload);
    return {
      success: true,
      message: 'Add Teacher successfully',
    };
  }
  //   async getAddUsert(payload: AddUsertInput) {
  //     await this.UsertRepo.getAddUsert(payload);
  //     return {
  //       success: true,
  //       message: 'Update successfully',
  //     };
  //   }

  async uploadImage(studentId: string, payload: UploadImageS3) {
    await this.userRepo.uploadImage(studentId, payload);
    return {
      success: true,
      message: 'Upload Successfully',
    };
  }

  async checkImage(mssv: string) {
    return await this.userRepo.checkImage(mssv);
  }

  async getStudent(studentId: string) {
    return await this.userRepo.getStudent(studentId);
  }

  async getUser(studentId: string) {
    return await this.userRepo.getUser(studentId);
  }

  async getImageFromSchool(mssv: string, classes: string) {
    return await this.userRepo.getImage(mssv, classes);
  }
}
