/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare type MessagesDocument = Messages & Document;
export declare class Messages {
    idMessages: string;
    allMessages: any[];
}
export declare const MessagesSchema: import("mongoose").Schema<import("mongoose").Document<Messages, any, any>, import("mongoose").Model<import("mongoose").Document<Messages, any, any>, any, any, any>, {}, {}>;
