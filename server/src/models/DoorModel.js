const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const DoorModel = sequelize.define(
  "Door",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("open", "close"),
      allowNull: false,
      defaultValue: "close",
    },
    temp_fingerprint_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "door",
    timestamps: false,
  }
);

module.exports = DoorModel;
