import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserGateWay } from "./user.gateway";
import { UserService } from "./user.service";

@Module({
	providers: [UserService, UserGateWay],
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		])
	]
})
export class UserModule {

}