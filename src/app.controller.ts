import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly MqttService: MqttService
  ) { }




  @Get('/clear')
  clear(): string {
    this.MqttService.mqtt.removeOutgoingMessage(1)
    return 'Cleared';
  }
  @Get('/ping')
  test(): string {
    this.MqttService.mqtt.publish(
      '/to-hexapod',
      'M1 0 20',
      { qos: 2, retain: false },
      (error: any) => {
        if (error) return
        console.log(error);
      },
    );

    return 'Pinged';
  }
}
