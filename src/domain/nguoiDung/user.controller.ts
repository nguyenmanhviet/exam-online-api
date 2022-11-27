import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { QueryFilterDto } from 'src/common/base/queryFitter';
import { SESService } from 'src/service/ses/sesService';
import {
  AddStudentInput,
  AddTeacherInput,
} from './dto/request/addTeacherInput';
import { UploadImageS3 } from './dto/request/uploadImageS3';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/student/:id')
  async getStudent(@Param('id') id: string) {
    return await this.userService.getStudent(id);
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post('/sv/:id/uploadImageS3')
  async uploadImage(@Param('id') id: string, @Body() payload: UploadImageS3) {
    return await this.userService.uploadImage(id, payload);
  }

  @Get('/sv/:mssv')
  async checkImage(@Param('mssv') mssv: string) {
    return await this.userService.checkImage(mssv);
  }

  @Get('/teacher')
  async getAllTeacher(@Query() queryParams: QueryFilterDto) {
    return await this.userService.getAllTeacher(queryParams);
  }

  @Post('/addTeacher')
  async AddTeacher(@Body() payload: AddTeacherInput) {
    return await this.userService.AddTeacher(payload);
  }

  @Get('/student')
  async getAllStudent(@Query() queryParams: QueryFilterDto) {
    return await this.userService.getAllStudent(queryParams);
  }

  @Get('/student/teacher/:teacherId')
  async getAllStudentWithTeacher(
    @Param('teacherId') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.userService.getAllStudentWithTeacher(id, queryParams);
  }

  @Post('/addStudent')
  async AddStudent(@Body() payload: AddStudentInput) {
    return await this.userService.AddStudent(payload);
  }

  @Get('/classSubject/:id/student')
  async getStudentInClass(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.userService.getStudentInClass(id, queryParams);
  }

  @Get('/notInClassSubject/:id/student')
  async getStudentNotInClass(
    @Param('id') id: string,
    @Query() queryParams: QueryFilterDto,
  ) {
    return await this.userService.getStudentNotInClass(id, queryParams);
  }

  @Get('getImage/:mssv/:class')
  async getImageFromSchool(
    @Param('mssv') mssv: string,
    @Param('class') classes: string,
  ) {
    return await this.userService.getImageFromSchool(mssv, classes);
  }

  @Get('sendEmail/:mssv')
  async sendEmail(@Param('mssv') mssv: string) {
    const ses = new SESService();
    await ses.sendEmail(mssv);
  }

  //   @Post('/addUser')
  //   async addUser(@Body() payload: AddUserInput) {
  //     return await this.userService.getAddSubject(payload);
  //   }
}
