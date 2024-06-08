import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
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


  async sendImageFromStorage(imagePath: string, serverUrl: string) {
    try {
      // Create a readable stream from the local image file
      const readStream = createReadStream(join(process.cwd(), imagePath));

      // Send the image data to the server
      await this.httpService
        .post(serverUrl, readStream, {
          headers: {
            'Content-Type': 'image/jpeg', // Set the appropriate content type
          },
        })
        .toPromise();

      return 'Image sent successfully';
    } catch (err) {
      throw err;
    }
  }
}
