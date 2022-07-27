import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({ origin: '*' });
  const cors = require('cors');
  app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
