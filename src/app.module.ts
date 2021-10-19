import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:anG3e9Sf4JvEXDy@cluster0.kauei.mongodb.net/sample?retryWrites=true&w=majority',
    ),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
