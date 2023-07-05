import { IsDefined, IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class LocalLoginDto {
  @Field()
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  username!: string;

  @Field()
  @IsDefined({ message: 'It is required to send the username' })
  @IsString({ message: 'It is required to send a valid string' })
  password!: string;
}
