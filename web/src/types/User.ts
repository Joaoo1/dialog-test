export type Friend = Omit<User, 'friends' | 'greeting'>;

export type User = {
  id: string;
  name: string;
  age: number;
  eyeColor: string;
  company: string;
  email: string;
  picture: string;
  friends: Friend[];
  greeting: string;
};
