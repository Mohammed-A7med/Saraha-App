import connectDB from "./../DB/connection.js";

const bootstrap = async (app, express) => {
  // connect to the database
  await connectDB();

  app.use(express.json());

  app.all("/*splat", (req, res) => {
    res.status(404).json({
      success: false,
      message: "API not found!",
    });
  });
};

export default bootstrap;
