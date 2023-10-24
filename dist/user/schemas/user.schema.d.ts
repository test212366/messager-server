/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare type UserDocument = User & Document;
export declare class User {
    name?: string;
    email?: string;
    password?: string;
    chats?: [];
    pinnedChats?: [];
    nowChat?: string;
    status?: string;
    todo?: [];
    avatarSRC?: string;
    data?: [];
    online?: 'online';
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any, any>, {}, {}>;
