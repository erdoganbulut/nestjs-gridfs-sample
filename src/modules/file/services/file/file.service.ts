import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { createReadStream, unlink, writeFileSync } from 'fs';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class FileService {
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private connection: Connection) {
    console.log(connection.db);
    // If you delete the 3 lines below and activate the codes on the 26th line, it will work.
    this.bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'klineBucket',
    });
  }

  async uploadFile(): Promise<string> {
    const samplejson = {
      foo: Math.random(),
      bar: Math.random(),
      baz: Math.random(),
    };
    return new Promise((resolve, reject) => {
      // this.bucket = new GridFSBucket(this.connection.db, {
      //   bucketName: 'klineBucket',
      // });

      const generatedFileName = 'sample.json';
      writeFileSync(generatedFileName, JSON.stringify(samplejson));

      const id = new ObjectId();
      createReadStream(generatedFileName)
        .pipe(this.bucket.openUploadStreamWithId(id, generatedFileName))
        .on('error', (err) => {
          console.log('sync-kline.service Error:', err);
          reject(new ServiceUnavailableException());
        })
        .on('finish', () => {
          console.log('done');

          resolve(id.toString());

          unlink(generatedFileName, (err) => {
            if (err) throw err;
            console.log(`${generatedFileName} was deleted`);
          });
        });
    });
  }
}
