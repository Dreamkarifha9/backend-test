import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'username of the user' })
  username: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
