import { ClassroomsInterface } from "./IClassRoom"
import { StudentsInterface } from "./IStudent"
import { TeachersInterface } from "./ITeacher"
import { GradesInterface } from "./IGrade"

export interface TeacherReocrdsInterface {
    ID: number,
    TeacherID: number,
    Teacher: TeachersInterface,
    StudentID: number,
    Student: StudentsInterface,
    ClassRoomID: number,
    ClassRoom: ClassroomsInterface
    GradeID: number,
    Grade: GradesInterface
    TeacherRecordYear: number,

}
