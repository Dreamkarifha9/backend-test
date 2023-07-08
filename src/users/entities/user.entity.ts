import { Extensions, Field, ID, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { BasicData } from 'src/shared/dtos/basic-data.entity';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { checkRoleMiddleware } from 'src/shared/decorators/check-role-middleware';
import { EPermission } from 'src/shared/enums';
@Entity('users', { schema: 'user' })
@ObjectType({
  implements: () => [BasicData],
})
export class User extends BasicData {
  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID, {
    nullable: true,
  })
  public id!: string;

  @Column({ unique: false, nullable: false })
  @FilterableField({ nullable: true, middleware: [checkRoleMiddleware] })
  @Extensions({ role: EPermission.READ })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  @FilterableField({ nullable: true })
  firstName: string;

  @Column({ nullable: true, type: 'varchar' })
  @FilterableField({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @FilterableField({ nullable: true })
  email: string;

  @Column({ nullable: true, select: false })
  @FilterableField({ nullable: true })
  password: string;

  @Column()
  @FilterableField(() => Number)
  roleId: number;

  @Column({ nullable: true, select: false })
  @FilterableField({ nullable: true })
  salt?: string;

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  @Field()
  role?: Role;

  @OneToMany(() => Permission, (permission) => permission.users)
  @Field(() => [Permission])
  permissions?: Permission[];

  private tmpPassword?: string;

  @AfterLoad()
  private loadTmpPassword?(): void {
    this.tmpPassword = this.password;
  }

  @BeforeInsert()
  private async hashPasswordHook?(): Promise<void> {
    console.log('BeforeInsert:', this.tmpPassword, this.password);
    if (this.password) {
      this.salt = await bcrypt.genSalt();
      this.password = await this.hashPassword(this.password, this.salt);
    }
  }

  @BeforeUpdate()
  private async encryptPassword?(): Promise<void> {
    console.log('BeforeUpdate: display', this.tmpPassword, this.password);
    if (this.tmpPassword !== this.password) {
      this.salt = await bcrypt.genSalt();
      this.password = await this.hashPassword(this.password, this.salt);
    }
  }

  public hashPassword?(pwd: string, salt: string): Promise<string> {
    return bcrypt.hash(pwd, salt);
  }

  public constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
