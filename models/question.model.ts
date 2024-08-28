export enum QuestionTypeEnum {
  QCM = "qcm",
  TrueFalse = "trueFalse",
  RESUME = "resume",
}

export type QuestionType = "qcm" | "trueFalse" | "resume";

export interface QuestionModel {
  id?: string;
  position: number;
  type: QuestionType;
  content: string;
  correctAnswer: string | string[]; // Peut être une chaîne pour les types "resume" ou "trueFalse", ou un tableau pour les "qcm"
  options?: { label: string }[];
  timeLimit: number;
  offerId: string;
}
