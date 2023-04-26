import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ROLES } from './user-role-enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  username: string;

  @Column({
    length: 50,
  })
  password: string;

  @Column({
    length: 20,
    enum: ROLES,
  })
  role: ROLES;

  @Column({
    length: 50,
  })
  associatedId: string;
}
