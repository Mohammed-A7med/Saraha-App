import globalErrorHandler from "../utils/errorHandling/globalErrorHandler.js";
import notFoundHandler from "../utils/errorHandling/notFoundHandler.js";
import connectDB from "./../DB/connection.js";
import authRouter from "./auth/auth.controller.js";
import userRouter from "./user/user.controller.js";
import messageRouter from "./message/message.controller.js";

const bootstrap = async (app, express) => {
  // connect to the database
  await connectDB();

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.all("/*splat", notFoundHandler);

  app.use(globalErrorHandler);
};

export default bootstrap;
