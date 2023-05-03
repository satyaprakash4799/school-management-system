import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ROLES } from './user-role-enum';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    length: 70,
  })
  @Exclude()
  password: string;

  @Column({
    length: 20,
    enum: ROLES,
    nullable: true,
  })
  role: ROLES;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  studentId: string;

  @OneToOne(() => Student, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'studentId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'studentId',
  })
  student: Student;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  teacherId: string;

  @OneToOne(() => Teacher, {
    eager: false,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'teacherId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'teacherId',
  })
  teacher: Teacher;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
