import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, email) => {
	return jwt.sign({ id, email }, 'fdsjlk lsfdlkj lsdk',
		{ expiresIn: '48h' })
}
@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

	}
	async registerUser(user: User) {

		const { name, email, password } = user
		const usedEmail = await this.userModel.findOne({ email })

		if (usedEmail) return { error: "email уже используется" }
		const usedName = await this.userModel.findOne({ name })
		if (usedName) return { error: 'имя пользователя уже используется' }
		const hashPassword = await bcrypt.hash(password, 8)
		const newUser = new this.userModel({
			email: email,
			password: hashPassword,
			chats: [],
			pinnedChats: [],
			todo: [],
			data: [],
			nowChat: 'none',
			status: '',
			avatarSRC: '',
			name
		})
		const token = await generateJwt(newUser.id, newUser.name)
		await newUser.save()
		return { user: newUser, token }
	}
	async loginGoogle(user: User) {

		const { name, email } = user
		const userCreated = await this.userModel.findOne({ name })
		if (userCreated) {
			const token = generateJwt(userCreated._id, userCreated.name)
			return { user: userCreated, token }
		} else {
			const user = new this.userModel({
				name, email, chats: [],
				pinnedChats: [],
				todo: [],
				data: [],
				status: '',
				avatarSRC: '',
				nowChat: 'none'
			})
			await user.save()
			const token = generateJwt(user._id, user.name)
			return { user, token }
		}
	}
	async login(user: User) {
		const { email, password } = user
		const userCreated = await this.userModel.findOne({ email })
		if (!userCreated) return { error: 'email не используется, пользователь не найден..' }
		const comparePassword = bcrypt.compareSync(password, userCreated.password)
		if (!comparePassword) return { error: 'не действительный пароль' }
		const token = generateJwt(userCreated._id, userCreated.name)
		return { user: userCreated, token }
	}
	async getUser(token: any) {

		const decode = jwt.decode(token.token)
		const userFind = await this.userModel.findById(decode.id)

		const tokenNew = generateJwt(userFind._id, userFind.name)
		if (userFind) {
			return { user: userFind, token: tokenNew }
		} else {
			return { error: 'Токен не действительный' }
		}
	}
	async findUser(body: any) {
		try {
			const candidate = await this.userModel.findOne({ name: body.userName })
			if (candidate) return { user: candidate }
			return { error: 'Пользователь не найден' }
		} catch (e) {
			return { error: 'server error, ' + e }
		}
	}
	async setPinnedChats(body: any) {
		try {

			await this.userModel.findOneAndUpdate({ name: body.userName }, { pinnedChats: body.pinnedChats })
			return { status: 'complete' }
		} catch (e) {
			return { error: 'server error, ' + e }
		}
	}

	async getUserName(body: any) {
		try {

			await this.userModel.findOneAndUpdate({ name: body.userMeName }, { nowChat: body.chat.userName })
			const chatUser = await this.userModel.findOne({ name: body.chat.userName })
			let newChats: any = await body.localChats?.filter((chat: any) => chat.userName !== body.chat.userName)
			if (body.chat.lastText !== 'Нажмите чтобы быстро продолжить чат') {
				await this.userModel.findOneAndUpdate({ name: body.userMeName }, { chats: [{ isRead: true, lastText: body.chat.lastText, avatarSRC: chatUser.avatarSRC, lastTextAuthor: body.chat.lastTextAuthor, partner: body.chat.partner || body.userMeName, time: body.chat.time, userName: body.chat.userName }, ...newChats] })
			}
			if (!newChats) newChats = []

			const currentUser = await this.userModel.findOne({ name: body.userMeName })
			const user = await this.userModel.findOne({ name: body.chat.userName })
			return { user, currentUser, newChat: [{ isRead: true, lastText: body.chat.lastText, lastTextAuthor: body.chat.lastTextAuthor, avatarSRC: chatUser.avatarSRC, partner: body.chat.partner || body.userMeName, time: body.chat.time, userName: body.chat.userName }, ...newChats] }
		} catch (e) {
			return { error: 'server error, ' + e }
		}
	}
	async updateResMess(payload: any) {
		try {
			if (payload.partner !== payload.secondPartner) {

				const one = await this.userModel.findOne({ name: payload.partner })
				const two = await this.userModel.findOne({ name: payload.secondPartner })
				const currentArrayOne = await one.chats.filter((chat: any) => chat.userName !== two.name)
				const currentArrayTwo = await two.chats.filter((chat: any) => chat.userName !== one.name)

				await this.userModel.findOneAndUpdate({ name: payload.partner }, { chats: [{ userName: payload.secondPartner, avatarSRC: '', partner: payload.partner, lastText: payload.text, lastTextAuthor: payload.secondPartner, time: payload.time, isRead: payload.isRead }, ...currentArrayOne] })
				await this.userModel.findOneAndUpdate({ name: payload.secondPartner }, { chats: [{ userName: payload.partner, avatarSRC: payload.avatarSRC, partner: payload.secondPartner, lastText: payload.text, lastTextAuthor: payload.secondPartner, time: payload.time, isRead: payload.isRead }, ...currentArrayTwo] })

			} else {
				const one = await this.userModel.findOne({ name: payload.partner })
				const currentArrayOne = await one.chats.filter((chat: any) => chat.userName !== one.name)
				await this.userModel.findOneAndUpdate({ name: payload.partner }, { chats: [{ userName: payload.partner, avatarSRC: '', lastText: payload.text, lastTextAuthor: payload.secondPartner, time: payload.time, isRead: payload.isRead }, ...currentArrayOne] })

			}

		} catch (e) {
			console.log('server Error: ' + e)
		}
	}
	async setStatus(body: any) {
		try {

			await this.userModel.findOneAndUpdate({ name: body.userName }, { status: body.status })
			const user = await this.userModel.findOne({ name: body.userName })
			return { status: user.status }
		} catch (e) {
			console.log('Server error: ' + e)
		}

	}
	async getChatUser(body: any) {
		try {
			const chatUser = await this.userModel.findOne({ name: body.chat.userName })
			return { chatUser }
		} catch (e) {
			console.log('Servee error: ' + e)
		}
	}
	async setTodo(body: any) {
		try {

			await this.userModel.findOneAndUpdate({ name: body.userName }, { todo: body.pinnedChats })
		} catch (e) {
			console.log('Server error: ' + e)
		}
	}
	async setData(body: any) {
		try {

			await this.userModel.findOneAndUpdate({ name: body.userName }, { data: body.data })
		} catch (e) {
			console.log('Server error: ' + e)
		}
	}
	async updateOnline(body: any) {
		try {
			await this.userModel.findOneAndUpdate({ name: body.userName }, { online: body.online, nowChat: '' })
		} catch (e) {
			console.log('Server error: ' + e)
		}
	}
	async setAvatar(body: any) {
		try {
			await this.userModel.findOneAndUpdate({ name: body.name }, { avatarSRC: body.path })
			const user = await this.userModel.findOne({ name: body.name })
			return user
		} catch (e) {
			console.log('Server error: ' + e)
		}
	}

}