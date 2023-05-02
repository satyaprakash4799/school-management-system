import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '../common/guards/roles.guard';
import { ROLES } from '../user/user-role-enum';
import { Student } from './student.entity';

@Controller('student')
@Roles([ROLES.STUDENT])
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getStudent(
    @GetUser() user: User,
  ): Promise<Student | NotFoundException> {
    return this.studentService.getStudent(user);
  }

  @Post()
  async createStudent(
    @GetUser() user: User,
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student | ConflictException> {
    return this.studentService.createStudent(user, createStudentDto);
  }

  @Put()
  async updateStudent(
    @GetUser() user: User,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student | NotFoundException> {
    return this.studentService.updateStudent(user, updateStudentDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteStudent(
    @GetUser() user: User,
  ): Promise<void | NotFoundException> {
    return this.studentService.deleteStudent(user);
  }
}
