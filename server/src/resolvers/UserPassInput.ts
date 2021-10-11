import { Field, InputType } from "type-graphql";

@InputType()
export class UserPassInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
