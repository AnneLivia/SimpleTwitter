import bcryptjs from 'bcryptjs';

const hashPassword = async (password) => {
  if (!password) return undefined;
  return await bcryptjs.hash(password, 10);
};

export default hashPassword;
