import {
  Controller,
  HttpCode,
  Post,
  Body,
  Request,
  Get,
  Put,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { Public } from './decorators/public.decorator';
import { UpdateUserDto } from '../user/dto/update-user-dto';
import { GetUserDto } from '../user/dto/get-user-dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(200)
  @Post('login')
  @Public()
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signIn(createUserDto);
  }

  @Get('user')
  async getUser(@GetUser() user: User) {
    return await user;
  }
  @HttpCode(200)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req);
  }

  @Post('signup')
  @Public()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Put(':username')
  async updateUser(
    @Param() getUserDto: GetUserDto,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() currentUser: User,
  ) {
    const { username } = getUserDto;
    const { username: currentUserUserName } = currentUser;
    if (username === currentUserUserName) {
      return this.authService.updateUser(getUserDto, updateUserDto);
    } else {
      throw new ForbiddenException();
    }
  }

  @HttpCode(204)
  @Delete('user')
  async deleteUser(@GetUser() user: User): Promise<void> {
    return await this.authService.deleteUser(user);
  }
}
