import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { Messages, MessagesSchema } from "./schemas/messages.schema";




@Module({
	providers: [MessagesService],
	controllers: [MessagesController],
	imports: [
		MongooseModule.forFeature([
			{ name: Messages.name, schema: MessagesSchema }
		])
	]
})
export class MessagesModule { }
