import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field()
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  initials!: string;

  @Field()
  title!: string;

  @Field()
  location!: string;

  @Field()
  phone!: string;

  @Field()
  email!: string;

  @Field()
  linkedin!: string;

  @Field()
  telegram!: string;

  @Field()
  tagline!: string;

  @Field(() => [String])
  stack!: string[];
}
