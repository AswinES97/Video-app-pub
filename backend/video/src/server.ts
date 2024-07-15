import http from "node:http";
import "express-async-errors";
import "dotenv/config";
import app from "./app";
import { configKeys } from "./config/configKeys";
import { testDbConnection } from "./config/db";

const server = http.createServer(app);
const PORT = configKeys.PORT;

const startServer = async (): Promise<void> => {
  await testDbConnection();
  server.listen(PORT, () => {
    console.log(server.address());
  });
};

// To avoid running server on tests.
if (process.env.NODE_ENV !== "test") {
  void startServer();
}
