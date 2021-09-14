import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Yaroslav', description: 'User`s name'})
    @IsString({message: 'Username should be a string!'})
    @Length(4, 20, {message: 'Username length should be not less then 4, and not greater then 20!'})
    readonly username: string;
}