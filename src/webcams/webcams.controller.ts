import { Controller, Get, Param } from '@nestjs/common';
import { WebcamsService } from './webcams.service';
import { WebcamsGateway } from './webcams.gateway';


@Controller('webcams')
export class WebcamsController {

  constructor(private readonly webcamsGateway: WebcamsGateway,
    private readonly webcamService: WebcamsService
  ) { }

  @Get(':id')
  selectWebcam(@Param('id') webcamId: string) {
    this.webcamsGateway.setMjpegStreamUrl(`http://raspberrypi.local/webcam/stream`);
  }
}
