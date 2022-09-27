import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { CommonUtils } from '../../utils/common.utils';

@Injectable()
export class GridFsMulterConfig implements MulterOptionsFactory {
  gridFsStorage = new GridFsStorage({
    url: CommonUtils.conn,
  });

  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: CommonUtils.conn,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }

}