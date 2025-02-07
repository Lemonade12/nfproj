require("dotenv").config();
const db = require("./database/index");
const addIptmToDB = require("./work/addIptmToDB");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((error: any) => {
    console.error("DB 연결 실패:", error);
  });

addIptmToDB();
