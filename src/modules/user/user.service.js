import User from "../../DB/models/user.model.js";
import { decrtption, encrtption } from "../../utils/encryption/encryption.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";

export const profile = asyncHandler(async (req, res, next) => {
  const { user } = req;

  // decrypt phone
  const phone = decrtption({ cipherText: user.phone });

  return res.status(200).json({ success: true, user: { ...user, phone } });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  if (req.body.phone) {
    req.body.phone = encrtption({ plainText: req.body.phone });
  }
  
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  return res
    .status(200)
    .json({
      success: true,
      message: "Profile updated successfully!",
      user: { updatedUser },
    });
});
