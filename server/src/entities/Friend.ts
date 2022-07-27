/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Friend {
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
}
