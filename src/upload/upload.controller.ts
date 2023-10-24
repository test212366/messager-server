import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { UploadService } from "./upload.service";
const multer = require('multer')


const cloudinaryStorage = multer.memoryStorage()


@Controller('upload')
export class FileUploader {
	constructor(private readonly uploadService: UploadService) { }


	@Post('/setImage')
	@UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
	setImage(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.setImage(file)
	}
	@Post('/setAvatar')
	@UseInterceptors(FileInterceptor('avatar', { storage: cloudinaryStorage }))
	setAvatar(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.setAvatar(file)
	}
	@Post('/setAudio')
	@UseInterceptors(FileInterceptor('audio', { storage: cloudinaryStorage }))
	setAudio(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.setAudio(file)
	}
}