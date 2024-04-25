import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import { MainApi } from "./routes/index.routes";
import { DbMongo } from "./config/mongodb.connect";
import { Server } from "http";
const health = require("@cloudnative/health-connect");
import http from "http";
const socketIo = require("socket.io");
let healthcheck = new health.HealthChecker();
import {
  MongoCluster,
  MongoDbName,
  Mongo_Pass,
  Mongo_user_name,
} from "./utils/constant";
import { Socket } from "socket.io";

let server: Server | null = null;
const PORT = process.env.PORT || 5001;
let io: Socket; // Define io variable

function initApplication(): express.Application {
  new DbMongo().connect(MongoCluster, MongoDbName, Mongo_user_name, Mongo_Pass);
  const app = express();
  app.use(express.json());
  app.use(morgan("tiny"));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    next();
  });

  app.use(express.static("public"));
  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
  app.use(cors({ origin: "http://localhost:5173" }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(MainApi);
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    const status = err.statusCode || 500;
    res.locals.status = status;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(status);
    return res.json({
      error: {
        message: err.message,
      },
    });
  });
  app.use("/health", health.LivenessEndpoint(healthcheck));
  app.use("/ready", health.ReadinessEndpoint(healthcheck));
  return app;
}
function start() {
  const app = initApplication();

  const server = http.createServer(app);

  io = socketIo(server, { cors: { origin: "*" } });

  

  server.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on PORT:` + PORT);
  });

  return { server, io };
}
// Start the application
export default start;
