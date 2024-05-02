const mongoose = require("mongoose");

module.exports.db_connect = () => {
  const dbURI = process.env.DB_URL;
  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((e) => {
      console.log(`Error in Connecting to database : ${e} `);
      process.exit(1);
    });
};
