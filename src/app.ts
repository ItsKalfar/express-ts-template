import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import limiter from "./middleware/limiter.middleware";
import customCors from "./middleware/customCors.middleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(customCors);
app.use(helmet());
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
