import { CreateUserDto } from "src/dto/CreateUserDto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(user: CreateUserDto): Promise<User>;
}
