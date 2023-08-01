import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // for http header security
import morgan from "morgan"; // request loggers

import userRoutes from "./src/routes/userRoutes.js";

/* CONFIGURATION */
const app = express();

dotenv.config();
app.use(express.json());

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Quick Rec - Admin Backend Server is Running at : %s", port);

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
