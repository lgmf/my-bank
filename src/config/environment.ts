import * as dotenv from 'dotenv';
import { cleanEnv, num, str, url } from "envalid";

dotenv.config();

const environment = cleanEnv(process.env, {
  PORT: num({ default: 7000 }),
  DATABASE_URL: url(),
  JWT_SECRET: str()
})

export default environment;
