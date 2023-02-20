import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { deletePassword } from './helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}
  async getAll() {
    const allUsers = await this.users.find();

    return allUsers.map((user) => {
      deletePassword(user);
      return {
        ...user,
        updatedAt: +user.updatedAt,
        createdAt: +user.createdAt,
      };
    });
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

  async create(userDto: CreateUserDto) {
    const time = Date.now();
    const newUser = new UserEntity();
    // const newUser = this.users.create({
    //   id: uuidv4(),
    //   version: 1,
    //   createdAt: time,
    //   updatedAt: time,
    //   login: userDto.login,
    //   password: userDto.password,
    // });
    // if (userDto.login === null || userDto.password === null) {
    //   throw new HttpException('Login must be string', HttpStatus.BAD_REQUEST);
    // }
    // const newUser = {} as UserEntity;
    newUser.id = uuidv4();
    newUser.version = 1;
    newUser.createdAt = time;
    newUser.updatedAt = time;
    newUser.login = userDto.login;
    newUser.password = userDto.password;

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

    const oldPassword = user.password;

    if (oldPassword !== userDTO.oldPassword) {
      throw new HttpException('Old password is wrong!', HttpStatus.FORBIDDEN);
    }

    const updateTime = new Date().getTime();

    user.version += 1;
    user.updatedAt = updateTime;
    user.password = userDTO.newPassword;
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
