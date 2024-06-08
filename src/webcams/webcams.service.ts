import { HttpService } from '@nestjs/axios';
//@ts-ignore
import { streamToBlob } from 'stream-to-blob'
import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import * as fs from 'fs'
import { promisify } from 'util';

@Injectable()
export class WebcamsService {
  constructor(private readonly httpService: HttpService) { }


  async downloadSnapshot(imageUrl: string, imagePath: string) {
    const response = await this.httpService.get(imageUrl, { responseType: 'stream' }).toPromise();

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
      const response = await fetch('http:/192.168.145.49:8000/count', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data)
    } catch (exception) {
      console.log(exception)

    }
  }
}
