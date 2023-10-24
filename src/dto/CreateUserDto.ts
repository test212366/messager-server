import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
	@IsEmail()
	email: string

	password?: string
	avatarSRC?: string
	name?: string
	chats?: any

}