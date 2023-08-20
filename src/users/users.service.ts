import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { GraphQLError } from 'graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('users')
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserInput: CreateUserInput): Promise<User> {
    // const user =  this.userRepository.create(createUserInput);
    // return this.userRepository.save(user);
    return await this.userRepository.save(createUserInput);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
    // if (!getuser) throw new GraphQLError('User not found');
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    const editedUser = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    const result = await this.userRepository.update(
      { id: id },
      updateUserInput,
    );
    console.log(result);
    return editedUser;
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'deleted successfully';
  }
}
