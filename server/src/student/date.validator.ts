import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { Student } from './student.entity';

@ValidatorConstraint({ name: 'minAge', async: false })
export class StudentMinimumAgeValidator
  implements ValidatorConstraintInterface
{
  validate(
    value: Date,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const maxDate = moment();
    const minDate = moment(value);
    const CHILD_MINIMUM_AGE = 36;
    return maxDate.diff(minDate, 'month') >= CHILD_MINIMUM_AGE;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Student minimum age should be at least 3 years';
  }
}

@ValidatorConstraint({ name: 'exitDate', async: false })
export class StudentExitDateValidator implements ValidatorConstraintInterface {
  validate(
    student: Student,
    args: ValidationArguments,
  ): boolean | Promise<boolean> {
    const { admissionDate, exitDate } = student;
    const exitDateMoment = moment(exitDate);
    const admissionDateMoment = moment(admissionDate);
    return exitDateMoment.diff(admissionDateMoment, 'day') >= 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Student exit date must be equal of after the admission date';
  }
}
