import { ID, ObjectType } from '@nestjs/graphql';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { User } from 'src/user/entities/user.entity';
@Entity('roles', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class Role extends BasicData {
  @PrimaryColumn()
  @IDField(() => ID, {
    nullable: true,
  })
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField(() => String)
  name: string;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'id' })
  user?: User;

  public constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
