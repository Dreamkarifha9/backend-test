import { InterfaceType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
/**
 * Class the represents a BasicData entity that must be inherited for all of
 * the entities used in the application
 */
@InterfaceType({
  isAbstract: true,
})
export abstract class BasicData {
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  @FilterableField({
    nullable: false,
  })
  active!: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  @FilterableField({
    nullable: false,
  })
  deleted!: boolean;

  @Column({ nullable: true })
  @FilterableField({
    nullable: true,
  })
  createdAt!: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @FilterableField({
    nullable: true,
  })
  createdBy!: string;

  @Column({ nullable: true })
  @FilterableField({
    nullable: true,
  })
  updatedAt!: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @FilterableField({
    nullable: true,
  })
  updatedBy!: string;
}
