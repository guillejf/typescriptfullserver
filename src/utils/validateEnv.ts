import { cleanEnv, port, str } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGO_CONNECTION_STRING: str(),
    PORT: port({ default: 3000 }),
    GOOGLE_APPLICATION_CREDENTIALS: str(),
  });
}

export default validateEnv;
