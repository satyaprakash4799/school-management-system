import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  password: string;
}
