import {
  Post,
  Get,
  Delete,
  Param,
  Res,
  Controller,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  // ApiImplicitFile,
  ApiConsumes,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ApiException } from './api-exception.model';
import { FileResponseVm } from './FileResponseVm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({
  //   name: 'file',
  //   required: true,
  //   description: 'Attachment Files',
  // })
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        id: file.id,
        filename: file.filename,
        metadata: file.metadata,
        bucketName: file.bucketName,
        chunkSize: file.chunkSize,
        size: file.size,
        md5: file.md5,
        uploadDate: file.uploadDate,
        contentType: file.contentType,
      };
      response.push(fileReponse);
    });

    return response;
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('info/:id')
  @ApiBadRequestResponse({ type: ApiException })
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file info',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'Archivo encontrado exitosamente.',
      file,
    };
  }

  @Get('fileInfo/:id')
  @ApiBadRequestResponse({ type: ApiException })
  async getInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findFileInfo(id);
    return {
      message: 'Archivo encontrado exitosamente.',
      file,
    };
  }

  @Get('download/:id')
  @ApiBadRequestResponse({ type: ApiException })
  async downloadFile(@Param('id') id: string) {
    let file;
    let chunks;
    try {
      file = await this.filesService.findFileInfo(id);
      chunks = await this.filesService.readFileStream(id);
      let base64: any = '';
      chunks.forEach((element) => {
        base64 += Buffer.from(element.get('data').buffer, 'binary').toString(
          'base64',
        );
      });
      const response = {
        file: base64,
        contentType: file._doc.contentType,
        filename: file._doc.filename,
      };
      return response;
    } catch (exception) {
      console.log('Error convert base 64 file');
      console.log(exception);
    }
  }

  @Delete(':id')
  @ApiBadRequestResponse({ type: ApiException })
  @ApiCreatedResponse({ type: FileResponseVm })
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.deleteFile(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred during file deletion',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'Archivo eliminado exitosamente.',
      file,
    };
  }
}
