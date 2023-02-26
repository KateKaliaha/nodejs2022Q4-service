import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { deletePassword } from './helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}
  async getAll() {
    const allUsers = await this.users.find();

    const publicUsers = allUsers.map((user) => {
      const publicUser = deletePassword(user);
      return {
        ...publicUser,
        updatedAt: +user.updatedAt,
        createdAt: +user.createdAt,
      };
    });

    return publicUsers;
  }

  async getById(id: string) {
    const user = await this.users.findOneBy({
      id,
    });
    if (!user) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    return deletePassword(user);
  }

  async getByLogin(login: string) {
    const user = await this.users.findOneBy({
      login,
    });

    return user;
  }

  async create(userDto: CreateUserDto) {
    const time = Date.now();
    const newUser = new UserEntity();
    newUser.id = uuidv4();
    newUser.version = 1;
    newUser.createdAt = time;
    newUser.updatedAt = time;
    newUser.login = userDto.login;
    newUser.password = await bcrypt.hash(userDto.password, 10);

    await this.users.save(newUser);

    return deletePassword(newUser);
  }

  async update(id: string, userDTO: UpdateUserDto) {
    const user = await this.users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidatePassword = await bcrypt.compare(
      userDTO.oldPassword,
      user.password,
    );

    if (!isValidatePassword) {
      throw new HttpException('Old password is wrong!', HttpStatus.FORBIDDEN);
    }

    const updateTime = new Date().getTime();

    user.version += 1;
    user.updatedAt = updateTime;
    user.password = await bcrypt.hash(userDTO.newPassword, 10);
    user.createdAt = +user.createdAt;

    await this.users.save(user);

    return deletePassword(user);
  }

  async delete(id: string) {
    const user = await this.users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.users.remove(user);
  }
}
