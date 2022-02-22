import { User } from '../../user/entities/user.entity';

export class ReplacedChatDto {
  readonly name: string;
  readonly readyUsers: User[];
}
