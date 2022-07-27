import { Arg, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { UsersService } from '../services/UsersService';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async list(@Arg('name', { defaultValue: '' }) name?: string) {
    const { findAllByName, findAll } = new UsersService();
    return name ? findAllByName(name) : findAll();
  }

  @Query(() => User)
  async find(@Arg('id') id: string) {
    const { findById } = new UsersService();
    return findById(id);
  }
}
