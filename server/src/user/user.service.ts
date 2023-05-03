import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from './dto/get-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';
import { ValidateUserDto } from './dto/validate-user-dto';

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
    delete user.password;
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

  async updateUser(getUserDto: GetUserDto, updateUserDto: UpdateUserDto) {
    try {
      const { username } = getUserDto;
      const {
        username: updateUserName,
        password,
        studentId,
        teacherId,
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

      // if (studentId) {
      //   queryPayload['studentId'] = studentId;
      // }
      // if (teacherId) {
      //   queryPayload['teacherId'] = teacherId;
      // }

      if (role) {
        queryPayload['role'] = role;
      }
      const query = this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ ...queryPayload })
        .where('username = :username', { username: username })
        .returning(['id', 'username', 'role', 'studentId', 'teacherId']);
      const result = await query.execute();
      const user = result.raw[0];
      return user;
    } catch (error) {
      if (error?.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(getUserDto: GetUserDto) {
    const user = await this.getUser(getUserDto);
    await this.userRepository.delete({
      username: user.username,
    });
  }

  async validateUser(validateUserDto: ValidateUserDto) {
    const { username, password } = validateUserDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Please check your login crdedentails');
    }
  }
}
