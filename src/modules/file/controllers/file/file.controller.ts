import { Controller, Get } from '@nestjs/common';
import { FileService } from '../../services/file/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('save')
  async save(): Promise<string> {
    return await this.fileService.uploadFile();
  }
}
