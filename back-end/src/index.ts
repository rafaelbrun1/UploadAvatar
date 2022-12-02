import express, { NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router, Request, Response } from "express";
import { avatarRouter } from "../src/database/avatar.router";
import cors from "cors";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const route: Router = Router();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
  app.use(cors());
  next();
});

app.use(express.json());
app.use('/upload-image', avatarRouter)
app.use(route);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
