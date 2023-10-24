import { Body, Controller, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";


@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {

	}
	@Post('/updateChats')
	updateChats(@Body() body: any) {
		return this.messagesService.updateChats(body)
	}
	@Post('/getChat')
	getChat(@Body() body: any) {
		return this.messagesService.getChat(body)
	}
}