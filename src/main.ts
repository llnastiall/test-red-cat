import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from "./pipes/validation.pipe";
import {DataSource} from "typeorm";
import {seedData} from "./seeds/seeder";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  await seedData(dataSource);
  const config = new DocumentBuilder()
      .setTitle('Billing system')
      .setDescription('Documentation for billing system')
      .setVersion('1.0.0')
      .addTag('Billing')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
      console.log(`Server has been started http://localhost:${PORT}`),
  );
}

start();
