import { Injectable } from '@nestjs/common';

@Injectable()
export class Yolov8Service {


  async processImage(imageBlob: Blob) {
    try {
      const formData = new FormData();
      formData.append('file', imageBlob);
      const response = await fetch('http:/192.168.31.110:8000/count', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      const base64 = 'data:image/jpeg;base64,' + data.base64
      // const path = converBase64ToImage(base64, 'src/storage/processed.jpg')
    } catch (exception) {
      console.error(exception)
    }
  }
}
