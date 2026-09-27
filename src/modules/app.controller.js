import connectDB from "./../DB/connection.js";
import authRouter from "./auth/auth.controller.js";
import userRouter from "./user/user.controller.js";

const bootstrap = async (app, express) => {
  // connect to the database
  await connectDB();

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.all("/*splat", (req, res) => {
    res.status(404).json({
      success: false,
      message: "API not found!",
    });
  });

  app.use((error, req, res, next) => {
    const status = error.cause || 500;
    return res
      .status(status)
      .json({ success: false, message: error.message, stack: error.stack });
  });
};

export default bootstrap;
