const express = require("express");
const { doorController } = require("../controllers/DoorController");

const Router = express.Router();

// /doors
Router.route("/")
  .get(doorController.getAllDoor)
  .post(doorController.createDoor);
Router.route("/opendoor")
  .get(doorController.getFingerprintID)
  .post(doorController.openDoor);
module.exports = { doorRouter: Router };
