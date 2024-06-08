import { HttpService } from '@nestjs/axios';
import { converBase64ToImage } from 'convert-base64-to-image'
//@ts-ignore
import * as PImage from 'pureimage'
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import * as fs from 'fs'
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class WebcamsService {
  constructor(private readonly httpService: HttpService,
    private readonly itemsService: ItemsService) { }


  async downloadSnapshot(imageUrl: string, imagePath: string) {
    const response = await this.httpService
      .get(imageUrl, { responseType: 'stream' })
      .toPromise();

    const stream = createWriteStream(join(process.cwd(), imagePath));

    response.data.pipe(stream);

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        resolve(`Image downloaded and saved to ${imagePath}`);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  }


  private streamToBlob(stream: Readable): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.once('end', () => resolve(new Blob(chunks)));
      stream.once('error', reject);
    });
  }
  async processImage(imagePath: string, serverUrl: string) {

    try {
      const formData = new FormData();
      const filePath = 'src/storage/snapshot.jpg'
      const fileStream = fs.createReadStream(filePath);
      const fileBlob = await this.streamToBlob(fileStream);

      formData.append('file', fileBlob);
      const response = await fetch(process.env.YOLO_MODEL_PROCESS_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      const base64 = process.env.BASE64_IMAGE_PREFIX + data.base64

      converBase64ToImage(base64, 'src/storage/processed.jpg')


      this.itemsService.deleteAll();
      this.itemsService.createMany(data.data)

    } catch (exception) {
      console.error('error processing image')

    }
  }
}
