import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender } from './student-gender.enum';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  firstName: string;

  @Column({
    length: 20,
  })
  lastName: string;

  @Column({
    type: 'date',
  })
  dateOfBirth: Date;

  @Column({
    length: 10,
    enum: Gender,
  })
  gender: Gender;

  @Column({
    length: 30,
  })
  email: string;

  @Column({
    length: 12,
  })
  phoneNumber: string;

  @Column({
    length: 50,
  })
  address: string;

  @Column({
    length: 20,
  })
  city: string;

  @Column({
    length: 20,
  })
  state: string;

  @Column({
    length: 6,
  })
  pincode: string;

  @Column({
    type: 'date',
  })
  admissionDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  exitDate: Date;
}
