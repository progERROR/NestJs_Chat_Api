import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateChatDto {

    @ApiProperty({example: 'Our group chat', description: 'Name of a new chat'})
    @IsString({message: 'Name of a chat should be a string!'})
    @Length(4, 20, {message: 'Name of the chat length should be not less then 4, and not greater then 20!'})
    readonly name: string;

    readonly users: number[];
}