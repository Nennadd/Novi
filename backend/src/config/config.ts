import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME || "";
const PASSWORD = process.env.DB_PASSWORD || "";
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@novidb.m1np26v.mongodb.net`;

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

export const config = {
  mongo: { url: URL },
  server: { port: PORT },
};
