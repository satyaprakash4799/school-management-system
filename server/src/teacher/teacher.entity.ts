import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
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
    length: 30,
  })
  email: string;

  @Column({
    type: 'date',
  })
  dateOfBirth: Date;

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
  joiningDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  exitDate: Date;

  @OneToOne(() => User, (user) => user.teacherId)
  user: User;
}
