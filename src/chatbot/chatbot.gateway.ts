import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ChatbotService, Message } from './chatbot.service';
import { ChatMessage } from '@langchain/core/messages';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatbotGateway {
  constructor(private readonly chatbotService: ChatbotService) { }

  @SubscribeMessage('chat')
  async handleChat(

    @ConnectedSocket() client: Socket,
    @MessageBody('messages') messages: Message[],
  ) {
    console.log(messages)

    client.emit('chat', await this.chatbotService.handlePostRequest(messages));
  }
}
