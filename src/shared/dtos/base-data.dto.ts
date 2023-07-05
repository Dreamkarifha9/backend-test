import { Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';


export abstract class BaseDataDto {
  @Field({ nullable: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: false })
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @Field({ nullable: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
