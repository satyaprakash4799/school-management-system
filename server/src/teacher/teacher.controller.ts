import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Roles } from 'src/common/guards/roles.guard';
import { ROLES } from 'src/user/user-role-enum';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
@Roles([ROLES.TEACHER])
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  async getTeacher(@GetUser() user: User) {
    return this.teacherService.getTeacher(user);
  }

  @Post()
  async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
    @GetUser() user: User,
  ) {
    return this.teacherService.createTeacher(user, createTeacherDto);
  }

  @Put()
  async updateTeacher(
    @Body() updateTeacherDto: UpdateTeacherDto,
    @GetUser() user: User,
  ) {
    return this.teacherService.updateTeacher(user, updateTeacherDto);
  }

  @Delete()
  async deleteTeacher(@GetUser() user: User): Promise<void> {
    return this.teacherService.deleteTeacher(user);
  }
}
