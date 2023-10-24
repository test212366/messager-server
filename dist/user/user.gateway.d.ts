import { Model } from "mongoose";
import { UserDocument } from "./schemas/user.schema";
export declare class UserGateWay {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    server: any;
    sendMessage(client: any, payload: any): Promise<void>;
    sendTyped(client: any, payload: any): void;
    changeChat(client: any, payload: any): void;
    updateAvatar(client: any, payload: any): Promise<void>;
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
}
