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
  }
  private intervalId: NodeJS.Timeout;
  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  async handleConnection(client: any) {
    console.log(client.id);
    const { sockets } = this.io.sockets;
    this.logger.debug(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);

    this.intervalId = setInterval(() => {
      try {
        const snapshotUrl = "http://raspberrypi.local/webcam/snapshot";
        const imagePath = "src/storage/snapshot.jpg";
        this.webcamService.downloadSnapshot(snapshotUrl, imagePath);
        const imageData = fs.readFileSync(imagePath);
        this.server.emit('mjpeg-stream', imageData);
        this.webcamService.processImage(imagePath, this.mjpegStreamUrl)
      } catch (err) {
        console.error(err);
      }
    }, 400)
  }

  handleDisconnect(client: any) {
    clearInterval(this.intervalId)
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  setMjpegStreamUrl(url: string) {
    this.mjpegStreamUrl = url;
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    // Handle events from the client, if needed
    return data;
  }
}
