import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty({
    message: 'Invalid username',
  })
  username: string;
}
