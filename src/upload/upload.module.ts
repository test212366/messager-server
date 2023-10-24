import { Module } from "@nestjs/common";
import { FileUploader } from "./upload.controller";

import { UploadService } from "./upload.service";

@Module({
	providers: [UploadService,],
	controllers: [FileUploader],
	exports: [UploadService,]

})
export class UploadModule {

}