const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { userRouter } = require("./routers/UserRouter");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", userRouter);

// ROUTE TEST
app.get("/api", (req, res) => {
  res.json({ message: "API is running on Vercel" });
});

// Export đúng cách cho Vercel
module.exports = app;
module.exports.handler = serverless(app);
