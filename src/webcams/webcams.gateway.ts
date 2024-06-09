import { HttpService } from '@nestjs/axios';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';

import { Logger } from "@nestjs/common";
import { Server } from 'socket.io';
import path from 'path';

import * as fs from 'fs';
import { WebcamsService } from './webcams.service';
import { Socket } from 'dgram';

@WebSocketGateway({ cors: true })
export class WebcamsGateway {

  private readonly logger = new Logger(WebcamsGateway.name);
  private mjpegStreamUrl = 'http://raspberrypi.local/webcam/stream'; // Default stream URL

  constructor(private readonly httpService: HttpService,
    private readonly webcamService: WebcamsService) {
  }
  private intervalIds: NodeJS.Timeout[] = [];
  @WebSocketServer() io: Server;


  @SubscribeMessage("mjpeg-stream")
  async handleConnection(
    @MessageBody('action') action: 'start' | 'stop',
    @ConnectedSocket() client: Socket,
  ) {

    if (client) {
      this.logger.debug(`Client id: ${client} ${action}ed stream`);
      if (action === 'start') {
        this.startStream(client, 300);
      } else {
        this.stopStream(client);
      }
      this.intervalIds.push(
      )
    }
  }

  startStream(client: Socket, interval: number) {
    setInterval(() => {
      try {
        const snapshotUrl = "http://raspberrypi.local/webcam/snapshot";
        const imagePath = "src/storage/snapshot.jpg";
        this.webcamService.downloadSnapshot(snapshotUrl, imagePath);
        try {
          this.webcamService.processImage(imagePath, this.mjpegStreamUrl)
          const imageData = fs.readFileSync('src/storage/processed.jpg');
          client.emit('mjpeg-stream', imageData);
        }
        catch (e) {
          const imageData = fs.readFileSync('src/storage/snapshot.jpg');
          client.emit('mjpeg-stream', imageData);
        }
      } catch (err) {
        console.error('error');
      }
    }, interval)
  }

  stopStream(client: Socket) {
    client.disconnect()
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
