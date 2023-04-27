import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ValidateUserDto } from 'src/user/dto/validate-user-dto';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from 'src/user/dto/get-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(validateUserDto: ValidateUserDto) {
    const user = await this.validateUser(validateUserDto);
    const { username } = user;
    const payload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async validateUser(validateUserDto: ValidateUserDto) {
    return await this.userService.validateUser(validateUserDto);
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userService.getUser(getUserDto);
  }
}
