import {
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { ROLES } from '../user-role-enum';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsUUID('all', { message: 'Invalid student id' })
  studentId: string;

  @IsOptional()
  @IsUUID('all', { message: 'Invalid teacher id' })
  teacherId: string;
}
