import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ValidateUserDto } from '../user/dto/validate-user-dto';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from '../user/dto/get-user-dto';
import { Request } from 'express';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { UpdateUserDto } from '../user/dto/update-user-dto';
import { User } from '../user/user.entity';

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

  async refreshToken(request: Request) {
    const accessToken = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = await this.decodeToken(accessToken);
    const payload = { username: decodedToken.username };
    const updatedAccessToken = await this.jwtService.signAsync(payload);
    return { refreshToken: updatedAccessToken };
  }

  async decodeToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  async updateUser(getUserDto: GetUserDto, updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(getUserDto, updateUserDto);
  }

  async deleteUser(user: User) {
    const getUserDto = new GetUserDto();
    getUserDto.username = user.username;
    return await this.userService.deleteUser(getUserDto);
  }
}
