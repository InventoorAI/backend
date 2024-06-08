import { HttpService } from '@nestjs/axios';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

import { Logger } from "@nestjs/common";
import { Server } from 'socket.io';
import path from 'path';

import * as fs from 'fs';
import { WebcamsService } from './webcams.service';

@WebSocketGateway({ cors: true })
export class WebcamsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;

  private readonly logger = new Logger(WebcamsGateway.name);
  private mjpegStreamUrl = 'http://raspberrypi.local/webcam/stream'; // Default stream URL

  constructor(private readonly httpService: HttpService,
    private readonly webcamService: WebcamsService) {
    this.streamMjpeg();
  }

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any, ...args: any[]) {
    console.log(client.id);
    const { sockets } = this.io.sockets;
    this.logger.debug(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);

    try {
      return;
      setInterval(async () => {
        const snapshotUrl = "http://raspberrypi.local/webcam/snapshot";
        const imagePath = "src/storage/snapshot.jpg";
        this.webcamService.downloadSnapshot(snapshotUrl, imagePath);
        const imageData = fs.readFileSync(imagePath);
        this.server.emit('mjpeg-stream', imageData);
        const response = await this.httpService.get(this.mjpegStreamUrl, {
          responseType: 'stream',
        }).toPromise();
      }, 500)

    } catch (err) {
      console.error(err);
    }
  }
  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);

  }

  @SubscribeMessage("ping")
  handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    return {
      event: "pong",
      data: "Wrong data that will make the test fail",
    };
  }

  setMjpegStreamUrl(url: string) {
    this.mjpegStreamUrl = url;
    this.streamMjpeg();
  }


  private async streamMjpeg() {
    // this.server.emit('mjpeg-stream', 'test');
    // try {
    // } catch (err) {
    //   console.error(err);
    // }
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    // Handle events from the client, if needed
    return data;
  }
}
