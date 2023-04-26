import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from './dto/get-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(getUserDto: GetUserDto) {
    const { username } = getUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    if (await this.userRepository.findOne({ where: { username } })) {
      throw new ConflictException('User already exists');
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const {
      username: updateUserName,
      password,
      associatedId,
      role,
    } = updateUserDto;
    const queryPayload = {};

    if (updateUserName) {
      queryPayload['username'] = updateUserName;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      queryPayload['password'] = hashedPassword;
    }

    if (associatedId) {
      queryPayload['associatedId'] = associatedId;
    }

    if (role) {
      queryPayload['role'] = role;
    }
    const query = this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ ...queryPayload })
      .where('username = :username', { username: 'testuser' })
      .returning('*');
    const result = await query.execute();
    const user = result.raw[0];
    delete user['password'];
    return user;
  }

  async deleteUser(getUserDto: GetUserDto) {
    const user = await this.getUser(getUserDto);
    console.log(user);
    // return user;
    // delete user
  }
}
