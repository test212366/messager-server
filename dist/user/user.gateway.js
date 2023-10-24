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
exports.UserGateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UserGateWay = class UserGateWay {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async sendMessage(client, payload) {
        try {
            console.log(payload);
            await this.server.emit('CLIENT:RESPONCE_SEND_MESSAGE', { text: payload.text, urlAudio: payload.urlAudio, partner: payload.partner, imgSRC: payload.imgSRC, secondPartner: payload.secondPartner, time: client.handshake.time, isRead: payload.isRead });
        }
        catch (e) {
            console.log('server Error: ' + e);
        }
    }
    sendTyped(client, payload) {
        this.server.emit('CLIENT:RESPONCE_TYPED', payload);
    }
    changeChat(client, payload) {
        this.server.emit('CLIENT:RESPONCE_CHANGE_CHAT', { user: payload });
    }
    async updateAvatar(client, payload) {
        console.log(payload.user);
        this.server.emit('SERVER:RESPONCE_UPGRATE_AVATAR_CHAT_USER', { chatUserF: { user: payload.user } });
    }
    async handleConnection(client) {
        await this.userModel.findOneAndUpdate({ name: client.handshake.query.name }, { online: 'online' });
        const user = await this.userModel.findOne({ name: client.handshake.query.name });
        this.server.emit('CLIENT:RESPONCE_ONLINE_UPDATE', { user });
    }
    async handleDisconnect(client) {
        await this.userModel.findOneAndUpdate({ name: client.handshake.query.name }, { online: client.handshake.time, nowChat: '' });
        const user = await this.userModel.findOne({ name: client.handshake.query.name });
        console.log(user);
        this.server.emit('CLIENT:RESPONCE_ONLINE_UPDATE', { user });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], UserGateWay.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('CLIENT:SEND_MESSAGE'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserGateWay.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('CLIENT:TYPED_MESSAGE'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserGateWay.prototype, "sendTyped", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('CLIENT:CHANGE_CHAT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserGateWay.prototype, "changeChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("CLIENT:RESPONCE_UPGRATE_AVATAR_CHAT_USER"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserGateWay.prototype, "updateAvatar", null);
UserGateWay = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserGateWay);
exports.UserGateWay = UserGateWay;
//# sourceMappingURL=user.gateway.js.map