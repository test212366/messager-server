"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProvider = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary = require('cloudinary');
exports.UploadProvider = {
    provide: cloudinary,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'dnurycr3q',
            api_key: '615383183549669',
            api_secret: '55YG1rgojTqYlS8fYxvIkikJ3f0'
        });
    }
};
//# sourceMappingURL=upload.provider.js.map