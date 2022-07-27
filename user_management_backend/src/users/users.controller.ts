import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Post('/EnterUsername')
  @UseGuards(JwtAuthGuard)
  setUserName(@Req() req) {
    console.log(req);
    // this.userServices.updateUser(req.data.username);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return req.user;
    // return this.authService.validateUser(req.body)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
