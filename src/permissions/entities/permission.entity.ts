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
import { User } from 'src/users/entities/user.entity';
import { Feature } from '../features/entities/feature.entity';
import { Role } from 'src/roles/entities/role.entity';
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

  @Column({ nullable: false, type: 'int4' })
  @FilterableField(() => Number)
  roleId: string;

  @Column({ nullable: false, type: 'int4' })
  @FilterableField(() => Number)
  featureId: number;

  @Column({ nullable: false, type: 'boolean' })
  @FilterableField(() => Boolean)
  isUsed: boolean;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'roleId' })
  @Field(() => Role)
  role?: Role;

  @OneToOne(() => Feature, (feature) => feature.permissions)
  @JoinColumn({ name: 'featureId' })
  @Field(() => Feature)
  feature?: Feature;

  public constructor(partial: Partial<Permission>) {
    super();
    Object.assign(this, partial);
  }
}
