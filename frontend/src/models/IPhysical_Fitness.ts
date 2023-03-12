import { StudentsInterface } from "./IStudent";
import { TeacherReocrdsInterface } from "./ITeacherRecord";

export interface Physical_FitnessInterface {
  ID: number;

  Run50: number;

  Longjump: number;

  SitUp: number;

  BMI: number;

  GripStrength: number;

  Wieght: number;

  Height: number;

  Created_date: string;

  StudentID: number;
  Student: StudentsInterface;

  TeacherRecordID: number;
  TeacherRecord: TeacherReocrdsInterface;
}
