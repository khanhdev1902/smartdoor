const express = require("express");
const { userController } = require("../controllers/UserController");

const Router = express.Router();

// /users
Router.route("/")
  .get(userController.getAllUsers)     // GET tất cả user
  .post(userController.createUser);    // POST tạo user mới

// /users/:id
Router.route("/:id")
  .get(userController.getUserById)     // GET user theo id
  .put(userController.updateUser)      // PUT update theo id
  .delete(userController.deleteUser);  // DELETE user

module.exports = { userRouter: Router };
