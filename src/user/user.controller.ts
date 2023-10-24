import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/CreateUserDto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {

	}
	@Post('/register')
	registerUser(@Body() user: CreateUserDto) {
		return this.userService.registerUser(user)
	}
	@Post('/loginGoogle')
	loginGoogle(@Body() user: CreateUserDto) {
		return this.userService.loginGoogle(user)
	}
	@Post('/login')
	login(@Body() user: CreateUserDto) {
		return this.userService.login(user)
	}
	@Post('/getUser')
	getUser(@Body() token: any) {
		return this.userService.getUser(token)
	}
	@Post('/findUser')
	findUser(@Body() body: any) {
		return this.userService.findUser(body)
	}
	@Post('/setPinnedChats')
	setPinnedChats(@Body() body: any) {
		return this.userService.setPinnedChats(body)
	}
	@Post('/getUserName')
	getUserName(@Body() body: any) {
		return this.userService.getUserName(body)
	}
	@Post('/updateResMess')
	updateResMess(@Body() body: any) {
		return this.userService.updateResMess(body)
	}
	@Post('/setStatus')
	setStatus(@Body() body: any) {
		return this.userService.setStatus(body)
	}
	@Post('/getChatUser')
	getChatUser(@Body() body: any) {
		return this.userService.getChatUser(body)
	}
	@Post('/setTodo')
	setTodo(@Body() body: any) {
		return this.userService.setTodo(body)
	}

	@Post('/setData')
	setData(@Body() body: any) {
		return this.userService.setData(body)
	}
	@Post('/updateOnline')
	updateOnline(@Body() body: any) {
		return this.userService.updateOnline(body)
	}
	@Post('/setAvatar')
	setAvatar(@Body() body: any) {
		return this.userService.setAvatar(body)
	}
}