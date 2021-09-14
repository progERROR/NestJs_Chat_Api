import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {CreateChatDto} from "../chat/create-chat.dto";
import {UserService} from "../user/user.service";
import {ReplacedChatDto} from "../chat/replaced-chat.dto";

//Actually, this pipe is not necessary for this project.
//You can easily write such logic right in the chat service.
//I only wanted to show, how to deal with this problem using pipes.
//But this pipe is reusable, so in bigger proj it can bring more use than here.

@Injectable()
export class FindUserPipe implements PipeTransform{
    constructor(private userService: UserService) {}
    async transform(value: CreateChatDto, metadata: ArgumentMetadata): Promise<ReplacedChatDto>{
        let {name, users} = value
        const readyUsers = await Promise.all(users.map(async id => {
            return await this.userService.findUser(id)
        }))
        if (!readyUsers) {
            throw new HttpException('There is no such user/users', HttpStatus.NOT_FOUND)
        }
        const replacedUsersDto = {name, readyUsers}
        return replacedUsersDto
    }
}