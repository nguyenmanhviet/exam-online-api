export class AddTeacherInput {
  majorId: number;
  mssv: string;
  name: string;
  gender: boolean;
  phone: string;
  email: string;
  birthday: Date;
}

export class AddStudentInput {
  majorId: number;
  mssv: string;
  name: string;
  gender: boolean;
  phone: string;
  email: string;
  birthday: Date;
  classId: number;
  khoaHocId: number;
}
