export const register = async (req, res) => {
  try {
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message,
        error,
        stack: error.stack,
      });
  }
};

export const login = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User Logged In Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message,
        error,
        stack: error.stack,
      });
  }
};

