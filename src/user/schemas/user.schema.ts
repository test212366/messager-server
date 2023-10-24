import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type UserDocument = User & Document

@Schema()
export class User {
	@Prop()
	name?: string
	@Prop()
	email?: string
	@Prop()
	password?: string
	@Prop()
	chats?: []
	@Prop()
	pinnedChats?: []
	@Prop()
	nowChat?: string
	@Prop()
	status?: string
	@Prop()
	todo?: []
	@Prop()
	avatarSRC?: string
	@Prop()
	data?: []
	@Prop()
	online?: 'online'
}
export const UserSchema = SchemaFactory.createForClass(User)