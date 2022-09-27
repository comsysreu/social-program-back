import { Injectable } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { Connection, Types } from 'mongoose';
import { GridFSBucketReadStream, MongoClient } from 'mongodb';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { FileInfoVm } from './FileInfoVm';
import { FileStorageDB } from './FileStorageDB';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { GenericService } from '../generic/generic.service';
import { CommonUtils } from 'src/utils/common.utils';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(
    // @Inject('DbConnectionToken')
    // private readonly connection: Connection,
    private generic: GenericService,
  ) {
    // this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  entity = 'fs.files';
  entity_chunks = 'fs.chunks';

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    const client = new MongoClient(CommonUtils.conn, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db('liverpool');

    this.fileModel = new MongoGridFS(db, 'fs');
    const resp = await this.fileModel.readFileStream(id).catch(() => {
      throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND);
    });
    return resp;
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const resp = await this.fileModel
      .findById(id)
      .catch(() => {
        throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND);
      })
      .then((result) => result);
    return {
      filename: resp.filename,
      length: resp.length,
      chunkSize: resp.chunkSize,
      md5: resp.md5,
      contentType: resp.contentType,
    };
  }

  async findFileInfo(id: string): Promise<FileInfoVm> {
    const resp = await this.generic.findOne(id, this.entity).catch(() => {
      throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND);
    });
    return this.createPromise(resp);
  }

  createPromise(resp): Promise<FileInfoVm> {
    return new Promise((resolve, reject) => {
      const response = { ...resp };
      resolve(response);
    });
  }

  async readFileStream(id: string): Promise<FileStorageDB> {
    const objectId = new Types.ObjectId(id);
    const resp = await this.generic
      .findByFieldChunks(this.entity_chunks, 'files_id', objectId, false)
      .catch(() => {
        throw new HttpException('Archivo no encontrado', HttpStatus.NOT_FOUND);
      });
    return resp;
  }

  async deleteFile(id: string): Promise<boolean> {
    return this.fileModel.delete(id);
  }
}
