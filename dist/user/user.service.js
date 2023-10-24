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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, 'fdsjlk lsfdlkj lsdk', { expiresIn: '48h' });
};
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async registerUser(user) {
        const { name, email, password } = user;
        const usedEmail = await this.userModel.findOne({ email });
        if (usedEmail)
            return { error: "email уже используется" };
        const usedName = await this.userModel.findOne({ name });
        if (usedName)
            return { error: 'имя пользователя уже используется' };
        const hashPassword = await bcrypt.hash(password, 8);
        const newUser = new this.userModel({
            email: email,
            password: hashPassword,
            chats: [],
            pinnedChats: [],
            todo: [],
            data: [],
            nowChat: 'none',
            status: '',
            avatarSRC: '',
            name
        });
        const token = await generateJwt(newUser.id, newUser.name);
        await newUser.save();
        return { user: newUser, token };
    }
    async loginGoogle(user) {
        const { name, email } = user;
        const userCreated = await this.userModel.findOne({ name });
        if (userCreated) {
            const token = generateJwt(userCreated._id, userCreated.name);
            return { user: userCreated, token };
        }
        else {
            const user = new this.userModel({
                name, email, chats: [],
                pinnedChats: [],
                todo: [],
                data: [],
                status: '',
                avatarSRC: '',
                nowChat: 'none'
            });
            await user.save();
            const token = generateJwt(user._id, user.name);
            return { user, token };
        }
    }
    async login(user) {
        const { email, password } = user;
        const userCreated = await this.userModel.findOne({ email });
        if (!userCreated)
            return { error: 'email не используется, пользователь не найден..' };
        const comparePassword = bcrypt.compareSync(password, userCreated.password);
        if (!comparePassword)
            return { error: 'не действительный пароль' };
        const token = generateJwt(userCreated._id, userCreated.name);
        return { user: userCreated, token };
    }
    async getUser(token) {
        const decode = jwt.decode(token.token);
        const userFind = await this.userModel.findById(decode.id);
        const tokenNew = generateJwt(userFind._id, userFind.name);
        if (userFind) {
            return { user: userFind, token: tokenNew };
        }
        else {
            return { error: 'Токен не действительный' };
        }
    }
    async findUser(body) {
        try {
            const candidate = await this.userModel.findOne({ name: body.userName });
            if (candidate)
                return { user: candidate };
            return { error: 'Пользователь не найден' };
        }
        catch (e) {
            return { error: 'server error, ' + e };
        }
    }
    async setPinnedChats(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.userName }, { pinnedChats: body.pinnedChats });
            return { status: 'complete' };
        }
        catch (e) {
            return { error: 'server error, ' + e };
        }
    }
    async getUserName(body) {
        var _a;
        try {
            await this.userModel.findOneAndUpdate({ name: body.userMeName }, { nowChat: body.chat.userName });
            const chatUser = await this.userModel.findOne({ name: body.chat.userName });
            let newChats = await ((_a = body.localChats) === null || _a === void 0 ? void 0 : _a.filter((chat) => chat.userName !== body.chat.userName));
            if (body.chat.lastText !== 'Нажмите чтобы быстро продолжить чат') {
                await this.userModel.findOneAndUpdate({ name: body.userMeName }, { chats: [{ isRead: true, lastText: body.chat.lastText, avatarSRC: chatUser.avatarSRC, lastTextAuthor: body.chat.lastTextAuthor, partner: body.chat.partner || body.userMeName, time: body.chat.time, userName: body.chat.userName }, ...newChats] });
            }
            if (!newChats)
                newChats = [];
            const currentUser = await this.userModel.findOne({ name: body.userMeName });
            const user = await this.userModel.findOne({ name: body.chat.userName });
            return { user, currentUser, newChat: [{ isRead: true, lastText: body.chat.lastText, lastTextAuthor: body.chat.lastTextAuthor, avatarSRC: chatUser.avatarSRC, partner: body.chat.partner || body.userMeName, time: body.chat.time, userName: body.chat.userName }, ...newChats] };
        }
        catch (e) {
            return { error: 'server error, ' + e };
        }
    }
    async updateResMess(payload) {
        try {
            if (payload.partner !== payload.secondPartner) {
                const one = await this.userModel.findOne({ name: payload.partner });
                const two = await this.userModel.findOne({ name: payload.secondPartner });
                const currentArrayOne = await one.chats.filter((chat) => chat.userName !== two.name);
                const currentArrayTwo = await two.chats.filter((chat) => chat.userName !== one.name);
                await this.userModel.findOneAndUpdate({ name: payload.partner }, { chats: [{ userName: payload.secondPartner, avatarSRC: '', partner: payload.partner, lastText: payload.text, lastTextAuthor: payload.secondPartner, time: `${new Date}`, isRead: payload.isRead }, ...currentArrayOne] });
                await this.userModel.findOneAndUpdate({ name: payload.secondPartner }, { chats: [{ userName: payload.partner, avatarSRC: payload.avatarSRC, partner: payload.secondPartner, lastText: payload.text, lastTextAuthor: payload.secondPartner, time: `${new Date}`, isRead: payload.isRead }, ...currentArrayTwo] });
            }
            else {
                const one = await this.userModel.findOne({ name: payload.partner });
                const currentArrayOne = await one.chats.filter((chat) => chat.userName !== one.name);
                await this.userModel.findOneAndUpdate({ name: payload.partner }, { chats: [{ userName: payload.partner, avatarSRC: '', lastText: payload.text, lastTextAuthor: payload.secondPartner, time: `${new Date}`, isRead: payload.isRead }, ...currentArrayOne] });
            }
        }
        catch (e) {
            console.log('server Error: ' + e);
        }
    }
    async setStatus(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.userName }, { status: body.status });
            const user = await this.userModel.findOne({ name: body.userName });
            return { status: user.status };
        }
        catch (e) {
            console.log('Server error: ' + e);
        }
    }
    async getChatUser(body) {
        try {
            const chatUser = await this.userModel.findOne({ name: body.chat.userName });
            return { chatUser };
        }
        catch (e) {
            console.log('Servee error: ' + e);
        }
    }
    async setTodo(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.userName }, { todo: body.pinnedChats });
        }
        catch (e) {
            console.log('Server error: ' + e);
        }
    }
    async setData(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.userName }, { data: body.data });
        }
        catch (e) {
            console.log('Server error: ' + e);
        }
    }
    async updateOnline(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.userName }, { online: body.online, nowChat: '' });
        }
        catch (e) {
            console.log('Server error: ' + e);
        }
    }
    async setAvatar(body) {
        try {
            await this.userModel.findOneAndUpdate({ name: body.name }, { avatarSRC: body.path });
            const user = await this.userModel.findOne({ name: body.name });
            return user;
        }
        catch (e) {
            console.log('Server error: ' + e);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map