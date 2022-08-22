import { PartialType, PickType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDto extends PickType(CreateUserDto, ['username'] as const) {}

// export class UpdateUserDto extends PickType(CreateUserDto, ['name'] as const) {}
export class UpdateUserDto extends CreateUserDto {}

// export class UpdateUserDto extends PartialType(
//     OmitType(CreateUserDto, ['name'] as const),
// ) { }
