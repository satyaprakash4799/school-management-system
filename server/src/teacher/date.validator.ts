import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { Teacher } from './teacher.entity';

@ValidatorConstraint({ name: 'minAge', async: false })
export class TeacherAgeValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const MINIMUM_AGE = 18;
    const MAXIMUM_AGE = 65;
    const currentDate = moment();
    const dateValue = moment(value);
    return (
      MAXIMUM_AGE >= currentDate.diff(dateValue, 'years') &&
      currentDate.diff(dateValue, 'years') >= MINIMUM_AGE
    );
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Age must be in range of 18 to 65 years';
  }
}

@ValidatorConstraint({ name: 'exitDate', async: false })
export class TeacherExitDateValidator implements ValidatorConstraintInterface {
  validate(teacher: Teacher): boolean {
    const { joiningDate, exitDate } = teacher;
    return moment(joiningDate).diff(moment(exitDate), 'days') >= 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Exit date must be equal or after the joining date';
  }
}
