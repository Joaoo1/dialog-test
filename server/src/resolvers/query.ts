import { UsersService } from '../services/UsersService';

type ListArgs = {
  name?: string;
};

type FindArgs = {
  id: string;
};

export const queryResolver = {
  Query: {
    list: async (_: null, { name }: ListArgs) => {
      const { findAllByName, findAll } = new UsersService();
      return name ? findAllByName(name) : findAll();
    },
    find: async (_: null, { id }: FindArgs) => {
      const { findById } = new UsersService();
      return findById(id);
    },
  },
};
