import { Controller, Get } from '@nestjs/common';
import { GrpcMethodStreamingType } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }


}
