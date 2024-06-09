import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ItemsGateway {
  constructor(private readonly itemsService: ItemsService) { }


  @SubscribeMessage('items')
  async getItems(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket,
  ) {
    setInterval(async () => {
      const data = await this.itemsService.findAll()
      client.emit('items', data);
    }, 400)
  }

}
