const UserModel = require("../models/UserModel");

exports.userController = {
  // Lấy tất cả user
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching users" });
    }
  },

  // Lấy user theo ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching user" });
    }
  },

  // Tạo user mới
  async createUser(req, res) {
    try {
      const { name, status, fingerprint_id } = req.body;

      const user = await UserModel.create({
        name,
        status,
        fingerprint_id,
      });

      res.json({ success: true, message: "User created successfully", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error creating user" });
    }
  },

  // Update user theo ID
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, status, fingerprint_id } = req.body;

      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      await user.update({
        name,
        status,
        fingerprint_id,
      });

      res.json({ success: true, message: "User updated successfully", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating user" });
    }
  },

  // Xóa user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      await user.destroy();

      res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error deleting user" });
    }
  },
};
