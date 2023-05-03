import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { User } from 'src/user/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getStudent(user: User): Promise<Student | NotFoundException> {
    const student = await this.getRelatedStudent(user);

    if (!student) {
      throw new NotFoundException('No associated student found');
    }
    return student;
  }

  async getRelatedStudent(user: User): Promise<Student> {
    const getStudentQuery = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('user', 'user', 'user.studentId = student.id')
      .where('user.username= :username', { username: user.username });

    return await getStudentQuery.getOne();
  }

  async createStudent(
    user: User,
    createStudentDto: CreateStudentDto,
  ): Promise<Student | ConflictException> {
    const student = await this.getRelatedStudent(user);
    if (student) {
      throw new ConflictException('Student already exists');
    }
    const columnsList = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'gender',
      'email',
      'phoneNumber',
      'address',
      'city',
      'state',
      'pincode',
      'admissionDate',
      'exitDate',
    ];
    const queryPayload = {};

    columnsList.forEach((column) => {
      if (column in createStudentDto) {
        queryPayload[column] = createStudentDto[column];
      }
    });

    const createdStudent = this.studentRepository.create(queryPayload);
    await this.studentRepository.save(createdStudent);
    const updateUserQuery = this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ studentId: createdStudent.id })
      .returning('*')
      .execute();
    await updateUserQuery;
    return createdStudent;
  }

  async updateStudent(
    user: User,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | NotFoundException> {
    const student = await this.getRelatedStudent(user);
    if (!student) {
      throw new NotFoundException('No associated student found to update');
    }

    const columnsList = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'gender',
      'email',
      'phoneNumber',
      'address',
      'city',
      'state',
      'pincode',
      'admissionDate',
      'exitDate',
    ];
    const queryPayload = {};

    columnsList.forEach((column) => {
      if (column in updateStudentDto) {
        queryPayload[column] = updateStudentDto[column];
      }
    });
    const updatedStudentQuery = await this.studentRepository
      .createQueryBuilder('student')
      .update()
      .set(queryPayload)
      .returning('*')
      .execute();
    return updatedStudentQuery.raw[0];
  }

  async deleteStudent(user: User): Promise<void | NotFoundException> {
    const student = await this.getRelatedStudent(user);
    if (student) {
      await this.studentRepository.delete({
        id: student.id,
      });
    } else {
      throw new NotFoundException('No related student found');
    }
  }
}
