import ErrorMiddleware from './middleware/error.middleware';
import Controller from './utils/interfaces/controller.interface';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import helmet from 'helmet';
import morgan from 'morgan';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    // this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    /* initializeApp({
      credential: applicationDefault(),
    }); */

    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    //this.express.use(authenticatedMiddleware);
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  /* private initialiseDatabaseConnection(): void {
    const { MONGO_CONNECTION_STRING } = process.env;
    //console.log(MONGO_CONNECTION_STRING);
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_CONNECTION_STRING || '');
  } */

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port http://localhost:${this.port}`);
    });
  }
}

export default App;
