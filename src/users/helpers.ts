import { FavsEntity } from 'src/entities/favs.entity';
import { UserEntity } from 'src/entities/user.entity';

export const deletePassword = (obj: UserEntity) => {
  const copyObj = { ...obj };
  delete copyObj.password;
  return copyObj;
};

export const deleteId = (obj: FavsEntity) => {
  const copyObj = { ...obj };
  delete copyObj.id;
  return copyObj;
};
