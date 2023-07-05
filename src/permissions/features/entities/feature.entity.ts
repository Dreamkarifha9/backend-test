import { ObjectType } from '@nestjs/graphql';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import { Column, Entity } from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
@Entity('features', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class Feature extends BasicData {
  @Column({ unique: false, nullable: false })
  @FilterableField({ nullable: true })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField({ nullable: true })
  description: string;

  public constructor(partial: Partial<Feature>) {
    super();
    Object.assign(this, partial);
  }
}
