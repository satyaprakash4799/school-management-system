import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ROLES } from './user-role-enum';

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
    length: 50,
    nullable: true,
  })
  associatedId: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
