const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routers/UserRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
