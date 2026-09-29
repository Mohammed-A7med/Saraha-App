import bcrypt from "bcrypt";

export const generateHash = ({
  plainText,
  saltRounds = Number(process.env.SALT_ROUNDS),
}) => {
  return bcrypt.hashSync(plainText, saltRounds);
};

export const compareHash = ({ plainText, hashValue }) => {
  return bcrypt.compareSync(plainText, hashValue);
};
