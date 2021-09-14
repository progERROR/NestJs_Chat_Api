import {User} from "../user/user.entity";

export class ReplacedChatDto {
    readonly name: string;
    readonly readyUsers: User[];
}