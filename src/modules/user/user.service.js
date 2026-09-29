import { decrtption } from "../../utils/encryption/encryption.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";

export const profile = asyncHandler(async (req, res, next) => {
  const { user } = req;
  
  // decrypt phone
  const phone = decrtption({ cipherText: user.phone });

  return res.status(200).json({ success: true, user: { ...user, phone } });
});
