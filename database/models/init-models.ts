import { Sequelize } from "sequelize";
var iptmModel = require("./iptm");

function initModels(sequelize: Sequelize) {
  const iptm = iptmModel(sequelize);

  return {
    iptm,
  };
}
module.exports = initModels;
