import { UsersService } from '../services/UsersService';

type ListArgs = {
  name?: string;
};

export const queryResolver = {
  Query: {
    list: async (_: null, { name }: ListArgs) => {
      const { findAllByName, findAll } = new UsersService();
      return name ? findAllByName(name) : findAll();
    },
  },
};
