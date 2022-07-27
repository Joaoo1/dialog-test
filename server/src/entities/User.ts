/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from 'type-graphql';
import { Friend } from './Friend';

@ObjectType()
export class User {
  @Field(_type => ID, { name: 'id' })
  _id: string;

  @Field()
  index: number;

  @Field()
  picture: string;

  @Field()
  age: number;

  @Field()
  eyeColor: string;

  @Field()
  name: string;

  @Field()
  company: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(type => [Friend])
  friends: [Friend];

  @Field()
  greeting: string;
}
