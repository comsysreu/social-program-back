import { PartialType } from '@nestjs/mapped-types';
import { CreateCeilingDto } from './create-ceiling.dto';

// export class UpdateCeilingDto extends PartialType(CreateCeilingDto) {}
export class UpdateCeilingDto extends CreateCeilingDto {}
