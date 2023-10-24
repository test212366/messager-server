import { Injectable } from "@nestjs/common";
import cloudinary from "src/cloudinary";


@Injectable()
export class UploadService {

	async setImage(file: Express.Multer.File) {

		const uploadBuffer = (file: Express.Multer.File) => {
			return new Promise((resolve, reject) => {
				cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error: any, result: any) => {
					resolve(result)
				}).end(file.buffer)
			})
		}
		const result = await uploadBuffer(file)

		return result
	}
	async setAvatar(file: Express.Multer.File) {
		const uploadBuffer = (file: Express.Multer.File) => {
			return new Promise((resolve, reject) => {
				cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error: any, result: any) => {
					resolve(result)
				}).end(file.buffer)
			})
		}
		const result = await uploadBuffer(file)

		return result
	}
	async setAudio(file: Express.Multer.File) {
		const uploadBuffer = (file: Express.Multer.File) => {
			return new Promise((resolve, reject) => {
				cloudinary.v2.uploader.upload_stream({ resource_type: "auto" }, (error: any, result: any) => {
					resolve(result)
				}).end(file.buffer)
			})
		}
		const result = await uploadBuffer(file)
		return result


	}
}