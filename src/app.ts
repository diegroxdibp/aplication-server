import cors from "cors";
import express from "express";
import { ConsoleColor } from "./core/console";
import RequestLoggerMiddleware from "./core/http/request-logger.middleware";
import Logger from "./core/logger";
import router from "./routes";
import TokenMiddleware from "./security/token.middleware";

export default class App {
  public static run (port: number): void {
		const app = new App().express;
		app.listen(port, () => Logger.log(`--> App started at port ${port}`, ConsoleColor.FgGreen));
	}

  public express: express.Application;

  constructor() {
    this.express = express();
    this.setupExpress();
    this.setupLogger();
    this.routes();
  }

  private setupExpress(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  private setupLogger(): void {
    this.express.use(RequestLoggerMiddleware.logRequest);
  }

  private routes(): void {
    this.express.use(TokenMiddleware.tokenVerify);
    this.express.use(router);
  }
}