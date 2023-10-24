/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { CreateUserDto } from "src/dto/CreateUserDto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(user: CreateUserDto): Promise<{
        error: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        token: any;
        error?: undefined;
    }>;
    loginGoogle(user: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        token: any;
    }>;
    login(user: CreateUserDto): Promise<{
        error: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        token: any;
        error?: undefined;
    }>;
    getUser(token: any): Promise<{
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        token: any;
        error?: undefined;
    } | {
        error: string;
        user?: undefined;
        token?: undefined;
    }>;
    findUser(body: any): Promise<{
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        error?: undefined;
    } | {
        error: string;
        user?: undefined;
    }>;
    setPinnedChats(body: any): Promise<{
        status: string;
        error?: undefined;
    } | {
        error: string;
        status?: undefined;
    }>;
    getUserName(body: any): Promise<{
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        currentUser: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
        newChat: any[];
        error?: undefined;
    } | {
        error: string;
        user?: undefined;
        currentUser?: undefined;
        newChat?: undefined;
    }>;
    updateResMess(body: any): Promise<void>;
    setStatus(body: any): Promise<{
        status: string;
    }>;
    getChatUser(body: any): Promise<{
        chatUser: import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    setTodo(body: any): Promise<void>;
    setData(body: any): Promise<void>;
    updateOnline(body: any): Promise<void>;
    setAvatar(body: any): Promise<import("mongoose").Document<unknown, any, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
