import express, { Express } from "express";
import db from "./config/connection";
import routes from "./routes";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3001", 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
