const DoorModel = require("../models/DoorModel");
const UserModel = require("../models/UserModel");

exports.doorController = {
  async getAllDoor(req, res) {
    try {
      const doors = await DoorModel.findAll();
      res.status(200).json({ success: true, data: doors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching doors" });
    }
  },
  async createDoor(req, res) {
    try {
      const { status, temp_fingerprint_id } = req.body;
      const door = await DoorModel.create({ status, temp_fingerprint_id });
      res.json({
        success: true,
        message: "Door created successfully",
        data: door,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error creating door" });
    }
  },
  async getFingerprintID(req, res) {
    try {
      const door = await DoorModel.findByPk(1);
      res
        .status(200)
        .json({
          success: true,
          open: door.status==="open",
          fingerprint_id: door.temp_fingerprint_id,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error getting fingerprintID" });
    }
  },
  async openDoor(req, res) {
    try {
      const { statusDoor, fingerprint_id } = req.body;
      if (statusDoor != null) {
        const door = await DoorModel.findByPk(1);
        const open = statusDoor === "open";
        const temp_fingerprint_id = door.temp_fingerprint_id;
        await door.update({
          status: statusDoor,
          temp_fingerprint_id: temp_fingerprint_id,
        });
        res.json({ success: true, open: open, data: door });
        return;
      }
      if (fingerprint_id != null && fingerprint_id !== "") {
        const door = await UserModel.findOne({
          where: { fingerprint_id: fingerprint_id },
        });
        if (!door) {
          const item = await DoorModel.findByPk(1);
          const status = item.status;
          await item.update({
            status: status,
            temp_fingerprint_id: fingerprint_id,
          });
          res.json({
            success: true,
            open: status === "open",
            data: item,
          });
          return;
        }

        const item = await DoorModel.findByPk(1);
        const status = item.status === "open" ? "close" : "open";
        await item.update({
          status: status,
          temp_fingerprint_id: fingerprint_id,
        });
        res.json({
          success: true,
          open: status === "open",
          data: item,
        });
        return;
      }
      res.json({ open: false, message: "data cua tao dau :))" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error open door" });
    }
  },
};
