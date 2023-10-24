/// <reference types="multer" />
import { UploadService } from "./upload.service";
export declare class FileUploader {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    setImage(file: Express.Multer.File): Promise<unknown>;
    setAvatar(file: Express.Multer.File): Promise<unknown>;
    setAudio(file: Express.Multer.File): Promise<unknown>;
}
