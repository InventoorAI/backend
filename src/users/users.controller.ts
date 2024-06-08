import { Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Body } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ChatMessage, User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, Payload } from '@nestjs/microservices';
import { ChatbotService } from 'src/chatbot/chatbot.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @Inject('MQTT_CLIENT') private mqttClient: ClientProxy,
    private readonly chatbotService: ChatbotService,
  ) { }

  @Get(':id/chats')
  async getChatData(
    @Param('id') id: string
  ): Promise<ChatMessage[]> {
    return await this.usersService.findOne(id).then(user => user.chat);
  }


  @Post(':id/chats')
  async addChatData(
    @Body() chat: ChatMessage,
  ): Promise<string> {
    console.log(chat)
    return await this.chatbotService.chat([], new Blob());
  }

  @Get(':id/chats/:chatId')
  async getChatDataById(
    @Param('id') id: string) {
    return await this.usersService.findOne(id).then(user => user.chat)
  }


  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    const record = new MqttRecordBuilder(user)
      .setQoS(1)
      .build();
    this.mqttClient.emit('/to-user', record);
    return await this.usersService.update(id, user);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }
}
