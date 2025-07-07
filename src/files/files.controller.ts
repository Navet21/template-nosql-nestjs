import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('image/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName : string
  ){
    const path = this.filesService.getStaticImage(imageName)
    
    res.sendFile( path );
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/images',
        filename: fileNamer,
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('Make sure that the file is an Image');
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/image/${file.filename}`

    return {
      secureUrl,
    };
  }
}
