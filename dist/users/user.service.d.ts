import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    registerUser(user: User): Promise<User>;
}
