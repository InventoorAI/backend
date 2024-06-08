import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebcamsController } from './webcams.controller';
import { WebcamsService } from './webcams.service';
import { WebcamsGateway } from './webcams.gateway';

@Module({
  imports: [
    HttpModule.register({
    }),
  ],
  providers: [
    WebcamsService,
    WebcamsGateway],
  controllers: [WebcamsController],
})
export class WebcamsModule { }
