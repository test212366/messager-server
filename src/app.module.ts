import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UploadModule } from './upload/upload.module';

import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, MessagesModule, UploadModule, MongooseModule.forRoot('mongodb+srv://qwerty123:qwerty123@cluster0.2a9s5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
