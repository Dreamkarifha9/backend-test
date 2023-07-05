import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field(() => [String])
  output: string[];
}
