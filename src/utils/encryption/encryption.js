import CryptoJS from "crypto-js";

export const encrtption = ({
  plainText,
  secretKey = process.env.AES_SECRET_KEY,
}) => {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};

export const decrtption = ({
  cipherText,
  secretKey = process.env.AES_SECRET_KEY,
}) => {
  return CryptoJS.AES.decrypt(cipherText, secretKey).toString(
    CryptoJS.enc.Utf8,
  );
};
