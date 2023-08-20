import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { resolve } from 'path';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Resolver(() => User)
@ApiTags('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @ApiCreatedResponse({ type: User, description: 'you can post a user' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    // try {
    const user = await this.usersService.createUser(createUserInput);
    return user; // Return the created user
    // } catch (error) {
    //   throw new Error('Unable to create user.');
    // }

    // return this.usersService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: 'user' })
  getOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getOne(id);
  }

  @ApiTags()
  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @ApiOkResponse({ type: User, description: 'You can delete one user' })
  @Mutation(() => User, { name: 'userdelete' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
