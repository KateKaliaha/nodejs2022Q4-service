import { UserEntity } from 'src/entities/user.entity';
// import { User } from 'src/interfaces';

export const deletePassword = (obj: UserEntity) => {
  const copyObj = { ...obj };
  delete copyObj.password;
  return copyObj;
};
