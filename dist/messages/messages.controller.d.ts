import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
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
