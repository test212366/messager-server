/// <reference types="multer" />
export declare class UploadService {
    setImage(file: Express.Multer.File): Promise<unknown>;
    setAvatar(file: Express.Multer.File): Promise<unknown>;
    setAudio(file: Express.Multer.File): Promise<unknown>;
}
