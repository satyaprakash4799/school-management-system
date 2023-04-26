import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { GetUserDto } from './dto/get-user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // async getUser() {
  //   return await this.userService.getUser();
  // }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto);
  }

  @Delete()
  async deleteUser(@Body() getUserDto: GetUserDto) {
    return await this.userService.deleteUser(getUserDto);
  }
}
