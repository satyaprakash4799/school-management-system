import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  private columns: string[];

  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.columns = this.teacherRepository.metadata.columns.map(
      (column) => column.propertyName,
    );
  }

  async getRelatedTeacher(user: User): Promise<Teacher> {
    return await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('user', 'user', 'user.teacherId = teacher.id')
      .where('user.username= :username', { username: user.username })
      .getOne();
  }

  async getTeacher(user: User): Promise<Teacher | NotFoundException> {
    const teacher = await this.getRelatedTeacher(user);
    if (!teacher) {
      throw new NotFoundException('No associated teacher found');
    }
    return teacher;
  }

  async createTeacher(user: User, createTeacherDto: CreateTeacherDto) {
    const teacher = await this.getRelatedTeacher(user);

    if (teacher) {
      throw new ConflictException('Teacher already exists');
    }
    const queryLoad = {};
    this.columns.forEach((column) => {
      if (createTeacherDto[column]) {
        queryLoad[column] = createTeacherDto[column];
      }
    });

    const createdTeacher = this.teacherRepository.create(queryLoad);
    await this.teacherRepository.save(createdTeacher);

    const updateUserQuery = this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ teacherId: createdTeacher.id })
      .where('"user"."username"= :username', { username: user.username })
      .execute();
    await updateUserQuery;
    return await createdTeacher;
  }

  async updateTeacher(
    user: User,
    updateStudentDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.getRelatedTeacher(user);

    if (!teacher) {
      throw new NotFoundException('No related teacher');
    }

    const queryLoad = {};
    this.columns.forEach((column) => {
      if (updateStudentDto[column]) {
        queryLoad[column] = updateStudentDto[column];
      }
    });

    const updatedTeacher = await this.userRepository.update(
      { id: teacher.id },
      queryLoad,
    );
    return updatedTeacher.raw[0];
  }

  async deleteTeacher(user: User): Promise<void> {
    const teacher = await this.getRelatedTeacher(user);

    if (!teacher) {
      throw new NotFoundException('No related teacher found');
    }
    await this.teacherRepository.delete({
      id: teacher.id,
    });
  }
}
