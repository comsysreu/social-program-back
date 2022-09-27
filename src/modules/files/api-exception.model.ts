import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiException {
  @ApiProperty()
  @Expose()
  error: number;

  @ApiProperty()
  @Expose()
  message: number;

  @ApiProperty()
  @Expose()
  status: string;
}
