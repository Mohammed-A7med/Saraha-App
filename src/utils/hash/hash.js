import bcrypt from "bcrypt";

export const generateHash = async ({
  plainText,
  saltRounds  = Number(process.env.SALT_ROUNDS),
}) => {
  return bcrypt.hashSync(plainText, saltRounds );
};

export const compareHash = async ({ plainText, hashValue }) => {
  return bcrypt.compareSync(plainText, hashValue);
};
