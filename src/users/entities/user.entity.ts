import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user2' })
@ObjectType()
export class User {
  @ApiProperty()
  @Field((type) => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  firstName?: string;

  @Field({ nullable: true })
  @Column()
  lastName?: string;

  @Field({ nullable: true })
  @Column()
  email?: string;

  @Field({ nullable: true })
  @Column()
  password?: string;
}
