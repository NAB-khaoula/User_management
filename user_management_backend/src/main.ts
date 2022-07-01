import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({ credentials: true, origin: '*' });
  const cors = require('cors');
  app.use(cors({ credentials: true, origin: '*' }));
  await app.listen(3000);
}
bootstrap();
