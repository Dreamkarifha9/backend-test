import { InputType } from '@nestjs/graphql';

import { UserDto } from './user.dto';

/**
 * The class that represents the input that will perform the creation
 */
@InputType()
export class CreateUserInput extends UserDto { }
