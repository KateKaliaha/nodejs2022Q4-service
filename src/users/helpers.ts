import { UserEntity } from 'src/entities/user.entity';

export const deletePassword = (obj: UserEntity) => {
  const copyObj = { ...obj };
  delete copyObj.password;
  return copyObj;
};
