"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("../cloudinary");
let UploadService = class UploadService {
    async setImage(file) {
        const uploadBuffer = (file) => {
            return new Promise((resolve, reject) => {
                cloudinary_1.default.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    resolve(result);
                }).end(file.buffer);
            });
        };
        const result = await uploadBuffer(file);
        return result;
    }
    async setAvatar(file) {
        const uploadBuffer = (file) => {
            return new Promise((resolve, reject) => {
                cloudinary_1.default.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    resolve(result);
                }).end(file.buffer);
            });
        };
        const result = await uploadBuffer(file);
        return result;
    }
    async setAudio(file) {
        const uploadBuffer = (file) => {
            return new Promise((resolve, reject) => {
                cloudinary_1.default.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    resolve(result);
                }).end(file.buffer);
            });
        };
        const result = await uploadBuffer(file);
        return result;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map