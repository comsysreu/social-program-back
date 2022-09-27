import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileStorageDB {
  @ApiProperty()
  @Expose()
  files_id: any;

  @ApiProperty()
  @Expose()
  n: number;

  @ApiProperty()
  @Expose()
  data: any;
}
