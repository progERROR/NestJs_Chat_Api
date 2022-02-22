import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Hello, how was your day?',
    description: 'Text of a new message',
  })
  @IsString({ message: 'Text of a message should be a string!' })
  @Length(0, 500, { message: 'A message should contain maximum 500 symbols!' })
  readonly text: string;

  readonly userId: number;
  readonly chatId: number;
}
