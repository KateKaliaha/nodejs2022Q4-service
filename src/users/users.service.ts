import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/DB/db.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { deletePassword } from './helpers';

@Injectable()
export class UsersService {
  constructor(private db: DBService) {}
  getAll() {
    const allUsers = this.db.UserDB;
    return allUsers.map((user) => deletePassword(user));
  }
  getById(id: string) {
    const user = this.db.UserDB.find((el) => el.id === id);

    if (!user) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    return deletePassword(user);
  }
  create(userDto: CreateUserDto) {
    const time = new Date().getTime();
    const newUser = {
      id: uuidv4(),
      version: 1,
      createdAt: time,
      updatedAt: time,
      ...userDto,
    };
    this.db.UserDB.push(newUser);

    return deletePassword(newUser);
  }

  update(id: string, userDTO: UpdateUserDto) {
    const index = this.db.UserDB.findIndex((el) => el.id === id);

    if (index === -1) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    const oldPassword = this.db.UserDB[index].password;
    if (oldPassword !== userDTO.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const updateTime = new Date().getTime();
    this.db.UserDB[index].version += 1;
    this.db.UserDB[index].updatedAt += updateTime;
    this.db.UserDB[index].password = userDTO.newPassword;

    return deletePassword(this.db.UserDB[index]);
  }

  delete(id: string) {
    const index = this.db.UserDB.findIndex((el) => el.id === id);

    if (index === -1) {
      throw new HttpException(
        'User with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.UserDB.splice(index, 1);
  }
}
