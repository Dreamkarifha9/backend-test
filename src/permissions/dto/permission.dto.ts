import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseDataDto } from 'src/shared/dtos/base-data.dto';
@InputType()
@ObjectType()
export class PermissionDto extends BaseDataDto {
  id: string;

  @Field(() => String)
  @IsDefined({ message: 'It is required to send the userId' })
  @IsString({ message: 'It is required to send a valid string' })
  userId: string;

  @Field(() => Number)
  @IsNumber()
  featureId: number;

  @Field(() => Boolean)
  @IsDefined({ message: 'It is required to send the isUsed' })
  @IsString({ message: 'It is required to send a valid string' })
  isUsed: boolean;
}
