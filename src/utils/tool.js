import bcrypt from 'bcryptjs';

export const sign = (str) => {
  return bcrypt.hashSync(str.toString(), bcrypt.genSaltSync());
};
