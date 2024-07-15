import { Sequelize } from "sequelize";
import { DbConnectionError } from "@ticket-common/common";

const sequelize = new Sequelize("video", "admin", "admin", {
  host: "postgresql",
  // host: "localhost",
  dialect: "postgres",
});

const testDbConnection = async (): Promise<Sequelize> => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw new DbConnectionError();
  }
};

export { sequelize, testDbConnection };
