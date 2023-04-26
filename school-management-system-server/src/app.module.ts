import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { GradeModule } from './grade/grade.module';

@Module({
  imports: [
    UserModule,
    GradeModule,
    AssignmentModule,
    AttendanceModule,
    ClassModule,
    TeacherModule,
    EnrollmentModule,
    CourseModule,
    StudentModule,
    GradeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
