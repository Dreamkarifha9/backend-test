import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
@Entity('features', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class Feature extends BasicData {
  @PrimaryColumn()
  @Field(() => Number)
  id: number;

  @Column({ unique: false, nullable: false })
  @FilterableField({ nullable: true })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField({ nullable: true })
  slug: string;

  @OneToOne(() => Permission, (permission) => permission.feature)
  @JoinColumn({ name: 'id' })
  permissions?: Permission;

  public constructor(partial: Partial<Feature>) {
    super();
    Object.assign(this, partial);
  }
}
