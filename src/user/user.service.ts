import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./create-user.dto";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async addUser (dto: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.save(dto)
        } catch (e) {
            throw new HttpException('Something`s wrong during creating a new user', HttpStatus.BAD_REQUEST)
        }
    }

    async findUser (id: number): Promise<User> {
        return await this.userRepository.findOne({where: {id}})
    }

    async findUserWithChats (id: number): Promise<User> {
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.chats', 'chat')
            .where('user.id = :id', {id})
            .getOne()
    }
}
