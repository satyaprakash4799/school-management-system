import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getStudent(@GetUser() user: User) {
    this.studentService.getStudent(user);
  }

  @Post()
  async createStudent(
    @GetUser() user: User,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.createStudent(user, createStudentDto);
  }

  @Put()
  async updateStudent(
    @GetUser() user: User,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    console.log("update", updateStudentDto);
    return this.studentService.updateStudent(user, updateStudentDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteStudent(@GetUser() user: User): Promise<void> {
    this.studentService.deleteStudent(user);
  }
}
