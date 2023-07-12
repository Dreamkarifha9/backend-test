import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { User } from 'src/users/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
@Entity('roles', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class Role extends BasicData {
  @PrimaryColumn()
  @IDField(() => ID, {
    nullable: true,
  })
  @FilterableField(() => Number)
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField(() => String)
  name: string;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'id' })
  user?: User;

  @OneToMany(() => Permission, (permission) => permission.role)
  @JoinColumn({ name: 'id' })
  @Field(() => [Permission])
  permissions?: Permission[];

  public constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
