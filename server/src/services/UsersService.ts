import { User } from '../entities/User';
import { users } from '../data/users';
import { createSearchNameRegex } from '../utils/nameRegex';

export class UsersService {
  findAll(): User[] {
    return users;
  }

  findAllByName(name: string): User[] {
    const regex = createSearchNameRegex(name);
    return users.filter(user => regex.test(user.name));
  }
}
