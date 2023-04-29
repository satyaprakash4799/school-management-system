import { IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
