export class AddExamInput {
  subjectId: number;
  yearId: number;
  semesterId: number;
  examName: string;
  timeStart: Date;
  timeEnd: Date;
  volumeQuestion: number;
  timeDoQuiz: number;
  turnDoQuiz: number;
  password: string;
  observationId: number;
}
