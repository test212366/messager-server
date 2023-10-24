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
exports.FileUploader = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const multer = require('multer');
const cloudinaryStorage = multer.memoryStorage();
let FileUploader = class FileUploader {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    setImage(file) {
        return this.uploadService.setImage(file);
    }
    setAvatar(file) {
        return this.uploadService.setAvatar(file);
    }
    setAudio(file) {
        return this.uploadService.setAudio(file);
    }
};
__decorate([
    (0, common_1.Post)('/setImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: cloudinaryStorage })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploader.prototype, "setImage", null);
__decorate([
    (0, common_1.Post)('/setAvatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', { storage: cloudinaryStorage })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploader.prototype, "setAvatar", null);
__decorate([
    (0, common_1.Post)('/setAudio'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio', { storage: cloudinaryStorage })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileUploader.prototype, "setAudio", null);
FileUploader = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], FileUploader);
exports.FileUploader = FileUploader;
//# sourceMappingURL=upload.controller.js.map