import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@WebSocketGateway()
export class UserGateWay {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

	}
	@WebSocketServer()
	server


	@SubscribeMessage('CLIENT:SEND_MESSAGE')
	async sendMessage(client: any, payload: any) {
		try {
			await this.server.emit('CLIENT:RESPONCE_SEND_MESSAGE', { text: payload.text, urlAudio: payload.urlAudio, partner: payload.partner, imgSRC: payload.imgSRC, secondPartner: payload.secondPartner, time: payload.time, isRead: payload.isRead })

		} catch (e) {
			console.log('server Error: ' + e)
		}
	}
	@SubscribeMessage('CLIENT:TYPED_MESSAGE')
	sendTyped(client: any, payload: any): void {

		this.server.emit('CLIENT:RESPONCE_TYPED', payload)
	}
	@SubscribeMessage('CLIENT:CHANGE_CHAT')

	changeChat(client: any, payload: any) {

		this.server.emit('CLIENT:RESPONCE_CHANGE_CHAT', { user: payload })
	}
	@SubscribeMessage("CLIENT:RESPONCE_UPGRATE_AVATAR_CHAT_USER")
	async updateAvatar(client: any, payload: any) {

		this.server.emit('SERVER:RESPONCE_UPGRATE_AVATAR_CHAT_USER', { chatUserF: { user: payload.user } })
	}


	async handleConnection(client: any) {
		await this.userModel.findOneAndUpdate({ name: client.handshake.query.name }, { online: 'online' })
		const user = await this.userModel.findOne({ name: client.handshake.query.name })
		this.server.emit('CLIENT:RESPONCE_ONLINE_UPDATE', { user })
	}
	async handleDisconnect(client: any) {
		const date = new Date(client.handshake.time)
		const hours = date.getHours()
		let time = client.handshake.time.replace(hours, hours + 3)
		time = client.handshake.time.replace('00', "0")
		await this.userModel.findOneAndUpdate({ name: client.handshake.query.name }, { online: time, nowChat: '' })
		const user = await this.userModel.findOne({ name: client.handshake.query.name })
		this.server.emit('CLIENT:RESPONCE_ONLINE_UPDATE', { user })
	}

}