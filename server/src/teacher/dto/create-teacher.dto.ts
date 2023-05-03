import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import {
  TeacherAgeValidator,
  TeacherExitDateValidator,
} from '../date.validator';

export class CreateTeacherDto {
  @IsNotEmpty({
    message: 'First name is required field',
  })
  @MinLength(5, {
    message: 'First name must be of 5 characters length',
  })
  @MaxLength(20, {
    message: 'First name must not be of more than 20 characters length',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Last name is required field',
  })
  @MinLength(5, {
    message: 'Last name must be of 5 characters length',
  })
  @MaxLength(20, {
    message: 'Last name must not be of more than 20 characters length',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Email is a required field',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Date of the birth is required field' })
  @IsDateString(
    {
      strict: true,
    },
    {
      message: 'Date of birth field should be in ISO string format',
    },
  )
  @Validate(TeacherAgeValidator)
  dateOfBirth: Date;

  @IsNotEmpty({
    message: 'Phone number is a required field',
  })
  @MinLength(10, {
    message: 'Phone number must be of a 10 digits',
  })
  @MaxLength(12, {
    message: 'Phone number must not exceed more than 12 digits',
  })
  phoneNumber: string;

  @IsNotEmpty({
    message: 'Address is a required field',
  })
  @MinLength(10, {
    message: 'Address should be of minimum 10 characters',
  })
  @MaxLength(50, {
    message: 'Address should not be of maximum 50 characters',
  })
  address: string;

  @IsNotEmpty({
    message: 'City is a required field',
  })
  @MinLength(5, {
    message: 'City should be of minimum 5 characters',
  })
  @MaxLength(20, {
    message: 'City should not exceed maximum 20 characters',
  })
  city: string;

  @IsNotEmpty({
    message: 'State is a required field',
  })
  @MinLength(5, {
    message: 'State should be of minimum 5 characters',
  })
  @MaxLength(20, {
    message: 'State should not exceed maximum 20 characters',
  })
  state: string;

  @IsNotEmpty({
    message: 'Joining date is a required field',
  })
  @IsDateString(
    {
      strict: true,
    },
    {
      message: 'Joining date must be of be ISO string format',
    },
  )
  @Validate(TeacherAgeValidator, {
    message:
      'Teacher age must be in the range of 18 to 65 at the time of joining',
  })
  joiningDate: Date;

  @IsOptional()
  @IsNotEmpty({
    message: 'Exit date is a required field',
  })
  @IsDateString(
    {
      strict: true,
    },
    {
      message: 'Exit date must be of be ISO string format',
    },
  )
  @Validate(TeacherExitDateValidator)
  exitDate: Date;
}
