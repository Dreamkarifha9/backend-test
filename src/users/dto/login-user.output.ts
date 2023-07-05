import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserOutput {
  @Field(() => String, { description: 'Generated token of the user' })
  token: string;
}
