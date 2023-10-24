import { Model } from "mongoose";
import { MessagesDocument } from "./schemas/messages.schema";
export declare class MessagesService {
    private messagesModel;
    constructor(messagesModel: Model<MessagesDocument>);
    updateChats(body: any): Promise<{
        array: any[];
        error?: undefined;
    } | {
        error: string;
        array?: undefined;
    }>;
    getChat(body: any): Promise<{
        array: any;
        error?: undefined;
    } | {
        error: string;
        array?: undefined;
    }>;
}
