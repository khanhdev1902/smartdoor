const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { userRouter } = require("./routers/UserRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

module.exports = serverless(app);
