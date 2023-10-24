"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const messages_schema_1 = require("./schemas/messages.schema");
let MessagesService = class MessagesService {
    constructor(messagesModel) {
        this.messagesModel = messagesModel;
    }
    async updateChats(body) {
        try {
            const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.secondPartner}${body.partner}` });
            let candidateDialogTwo = false;
            if (!candidateDialog)
                candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.partner}${body.secondPartner}` });
            if (candidateDialog || candidateDialogTwo) {
                const one = await this.messagesModel.findOneAndUpdate({ idMessages: `${body.secondPartner}${body.partner}` }, { $push: { allMessages: body } });
                if (!one)
                    await this.messagesModel.findOneAndUpdate({ idMessages: `${body.partner}${body.secondPartner}` }, { $push: { allMessages: body } });
                return { array: one.allMessages };
            }
            else {
                const newDialog = new this.messagesModel({
                    idMessages: `${body.secondPartner}${body.partner}`,
                    allMessages: [{ text: body.text, partner: body.partner, secondPartner: body.secondPartner, time: body.time }]
                });
                await newDialog.save();
                return { array: newDialog.allMessages };
            }
        }
        catch (e) {
            return { error: 'server errror, ' + e };
        }
    }
    async getChat(body) {
        try {
            if (body.chat.partner !== body.chat.userName) {
                const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.chat.partner}` });
                if (!candidateDialog) {
                    const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.chat.userName}` });
                    let newArray = false;
                    if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                        newArray = candidateDialogTwo.allMessages.map((chat) => {
                            return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                        });
                    }
                    if (newArray)
                        await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.chat.userName}` }, { allMessages: newArray });
                    return { array: newArray || candidateDialogTwo.allMessages };
                }
                if (!candidateDialog)
                    return { array: [] };
                let newArray = false;
                if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                    newArray = candidateDialog.allMessages.map((chat) => {
                        return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                    });
                }
                if (newArray)
                    await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.userName}${body.chat.partner}` }, { allMessages: newArray });
                return { array: newArray || candidateDialog.allMessages };
            }
            else if (body.chat.partner === body.chat.userName && body.chat.lastTextAuthor !== body.chat.userName && body.chat.lastTextAuthor !== body.chat.partner) {
                const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.name}` });
                if (!candidateDialog) {
                    const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.name}` });
                    let newArray = false;
                    if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                        newArray = candidateDialogTwo.allMessages.map((chat) => {
                            return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                        });
                    }
                    if (newArray)
                        await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.name}` }, { allMessages: newArray });
                    return { array: newArray || candidateDialogTwo.allMessages };
                }
                if (!candidateDialog)
                    return { array: [] };
                let newArray = false;
                if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                    newArray = candidateDialog.allMessages.map((chat) => {
                        return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                    });
                }
                if (newArray)
                    await this.messagesModel.findOneAndUpdate({ idMessages: `${body.name}${body.chat.partner}` }, { allMessages: newArray });
                return { array: newArray || candidateDialog.allMessages };
            }
            else if (body.chat.partner === body.chat.userName && body.chat.lastTextAuthor === body.chat.userName && body.chat.lastTextAuthor === body.chat.partner) {
                const candidateDialog = await this.messagesModel.findOne({ idMessages: `${body.chat.userName}${body.chat.partner}` });
                if (!candidateDialog) {
                    const candidateDialogTwo = await this.messagesModel.findOne({ idMessages: `${body.chat.partner}${body.chat.userName}` });
                    let newArray = false;
                    if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                        newArray = candidateDialogTwo.allMessages.map((chat) => {
                            return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                        });
                    }
                    if (newArray)
                        await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.partner}${body.chat.userName}` }, { allMessages: newArray });
                    return { array: newArray || candidateDialogTwo.allMessages };
                }
                if (!candidateDialog)
                    return { array: [] };
                let newArray = false;
                if (body.chat.isRead === false && body.chat.lastTextAuthor !== body.name) {
                    newArray = candidateDialog.allMessages.map((chat) => {
                        return { isRead: true, text: chat.text, partner: chat.partner, urlAudio: chat.urlAudio, imgSRC: chat.imgSRC, secondPartner: chat.secondPartner, time: chat.time };
                    });
                }
                if (newArray)
                    await this.messagesModel.findOneAndUpdate({ idMessages: `${body.chat.userName}${body.chat.partner}` }, { allMessages: newArray });
                return { array: newArray || candidateDialog.allMessages };
            }
        }
        catch (e) {
            return { error: 'server error, ' + e };
        }
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(messages_schema_1.Messages.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map