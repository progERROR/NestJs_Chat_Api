import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "./create-user.dto";
import {UserService} from "./user.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({summary: 'Creating new user'})
    @ApiResponse({status: 200, type: Number})
    @Post('add')
    async addUser (@Body() dto: CreateUserDto): Promise<number> {
        const user = await this.userService.addUser(dto)
        return user.id
    }
}
