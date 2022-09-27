import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { GridFsMulterConfig } from './GridFsMulterConfig.service';
import { GenericModule } from '../generic/generic.module';
import { ConnectionModule } from '../connection/connection.module';

@Module({
  imports: [
    GenericModule,
    ConnectionModule,
    MulterModule.registerAsync({ useClass: GridFsMulterConfig }),
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfig, FilesService],
})
export class FilesModule {}
