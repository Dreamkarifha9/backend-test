import { IsDefined, IsEmail, IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseDataDto } from 'src/shared/dtos/base-data.dto';
@InputType()
@ObjectType()
export class UserDto extends BaseDataDto {
  id: string;

  @Field(() => String)
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string;

  @Field(() => String)
  @IsDefined({ message: 'It is required to send the username' })
  @IsString({ message: 'It is required to send a valid string' })
  username: string;

  @Field(() => String)
  @IsDefined({ message: 'It is required to send the firstName' })
  @IsString({ message: 'It is required to send a valid string' })
  firstName: string;

  @Field(() => String)
  @IsDefined({ message: 'It is required to send the lastName' })
  @IsString({ message: 'It is required to send a valid string' })
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Number)
  roleId: number;
}
