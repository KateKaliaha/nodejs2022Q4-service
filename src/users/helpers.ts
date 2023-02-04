import { User } from 'src/interfaces';

export const deletePassword = (obj: User) => {
  const copyObj = { ...obj };
  delete copyObj.password;
  return copyObj;
};
