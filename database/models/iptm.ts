import { Sequelize, DataTypes } from "sequelize";

module.exports = function (sequelize: Sequelize) {
  return sequelize.define(
    "iptm",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receptor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      molecule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iptm_avg: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
      freezeTableName: true,
      charset: "utf8mb4",
    }
  );
};
