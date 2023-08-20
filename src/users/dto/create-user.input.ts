import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateUserInput {
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
