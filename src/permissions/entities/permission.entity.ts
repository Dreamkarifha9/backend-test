import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { User } from 'src/user/entities/user.entity';
import { Feature } from '../features/entities/feature.entity';
@Entity('permissions', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class Permission extends BasicData {
  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID, {
    nullable: true,
  })
  public id!: string;

  @Column({ unique: false, nullable: false })
  @FilterableField({ nullable: true })
  userId: string;

  @Column({ nullable: false, type: 'int4' })
  @Field(() => Number)
  featureId: number;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn({ name: 'userId' })
  users: User;

  @OneToOne(() => Feature, (feature) => feature.permissions)
  feature?: Feature;

  public constructor(partial: Partial<Permission>) {
    super();
    Object.assign(this, partial);
  }
}