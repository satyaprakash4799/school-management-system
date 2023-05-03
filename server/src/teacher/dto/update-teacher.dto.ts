import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

export class UpdateTeacherDto extends PartialType(CreateStudentDto) {}
