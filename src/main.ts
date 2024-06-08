import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebcamsService } from './webcams/webcams.service';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    enableDebugMessages: true,
    skipNullProperties: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  app.enableCors({
    origin: [
      '*',
      // 'http://localhost:3000',
      // 'http://localhost:5173'
    ],
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      port: Number(process.env.MQTT_PORT) || 1883,
      protocol: 'mqtt',
      host: process.env.MQTT_HOST || 'mqtt-broker',
      clientId: process.env.MQTT_CLIENT_ID || 'server',
    }
  })

  app.startAllMicroservices()

  app.setGlobalPrefix('api'); // New


  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Inventoor API')
    .setDescription('The Inventoor API description')
    .setVersion('1.0')
    .addTag('inventoor')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)


  await app.listen(process.env.PORT || 3000);

}

bootstrap();
