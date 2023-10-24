import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MessagesDocument = Messages & Document

@Schema()
export class Messages {
	@Prop()
	idMessages: string
	@Prop()
	allMessages: any[]
}
export const MessagesSchema = SchemaFactory.createForClass(Messages)