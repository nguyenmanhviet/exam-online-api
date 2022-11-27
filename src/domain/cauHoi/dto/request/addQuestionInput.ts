export class AnswerInput {
  answer: string;
  isCorrect: boolean;
}

export class AddQuestionInput {
  subjectId: number;
  levelQuestionId: number;
  questionName: string;
  question: string;
  answers: [AnswerInput];
}
