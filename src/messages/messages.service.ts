import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Messages, MessagesDocument } from "./schemas/messages.schema";

@Injectable()
export class MessagesService {
	constructor(@InjectModel(Messages.name) private messagesModel: Model<MessagesDocument>) {

	}
	async updateChats(body: any) {

		try {
			const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.secondPartner}${body.partner}` })
			let candidateDialogTwo: any = false
			if (!candidateDialog) candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.partner}${body.secondPartner}` })

			if (candidateDialog || candidateDialogTwo) {

				const one = await this.messagesModel.findOneAndUpdate({ idMessages: `${body.secondPartner}${body.partner}` }, { $push: { allMessages: body } })

				if (!one) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.partner}${body.secondPartner}` }, { $push: { allMessages: body } })
				return { array: one.allMessages }
			} else {
				const newDialog = new this.messagesModel({
					idMessages: `${body.secondPartner}${body.partner}`,
					allMessages: [{ text: body.text, partner: body.partner, secondPartner: body.secondPartner, time: body.time }]
				})
				await newDialog.save()
				return { array: newDialog.allMessages }
			}
		} catch (e) {
			return { error: 'server errror, ' + e }
		}
	}
	async getChat(body: any) {

		try {

			if (body.chat.partner !== body.chat.userName) {
				const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.chat.partner}` })

				if (!candidateDialog) {
					const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.chat.userName}` })
					let newArray: any = false
					if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
						newArray = candidateDialogTwo.allMessages.map((chat: any) => {
							return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
						})
					}
					if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.chat.userName}` }, { allMessages: newArray })

					return { array: newArray || candidateDialogTwo.allMessages }
				}
				if (!candidateDialog) return { array: [] }


				let newArray: any = false
				if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
					newArray = candidateDialog.allMessages.map((chat: any) => {
						return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
					})
				}
				if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.userName}${body.chat.partner}` }, { allMessages: newArray })

				return { array: newArray || candidateDialog.allMessages }
			} else if (body.chat.partner === body.chat.userName && body.chat.lastTextAuthor !== body.chat.userName && body.chat.lastTextAuthor !== body.chat.partner) {
				const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.name}` })

				if (!candidateDialog) {
					const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.name}` })
					let newArray: any = false
					if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
						newArray = candidateDialogTwo.allMessages.map((chat: any) => {
							return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
						})
					}
					if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.name}` }, { allMessages: newArray })

					return { array: newArray || candidateDialogTwo.allMessages }
				}
				if (!candidateDialog) return { array: [] }


				let newArray: any = false
				if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
					newArray = candidateDialog.allMessages.map((chat: any) => {
						return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
					})
				}
				if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.name}${body.chat.partner}` }, { allMessages: newArray })

				return { array: newArray || candidateDialog.allMessages }
			} else if (body.chat.partner === body.chat.userName && body.chat.lastTextAuthor === body.chat.userName && body.chat.lastTextAuthor === body.chat.partner) {
				const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.chat.partner}` })

				if (!candidateDialog) {
					const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.chat.userName}` })
					let newArray: any = false
					if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
						newArray = candidateDialogTwo.allMessages.map((chat: any) => {
							return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
						})
					}
					if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.chat.userName}` }, { allMessages: newArray })

					return { array: newArray || candidateDialogTwo.allMessages }
				}
				if (!candidateDialog) return { array: [] }


				let newArray: any = false
				if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
					newArray = candidateDialog.allMessages.map((chat: any) => {
						return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time }
					})
				}
				if (newArray) await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.userName}${body.chat.partner}` }, { allMessages: newArray })

				return { array: newArray || candidateDialog.allMessages }
			}

		} catch (e) {
			return { error: 'server error, ' + e }
		}
	}
}