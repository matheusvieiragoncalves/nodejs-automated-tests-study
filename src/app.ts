import Dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

Dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
