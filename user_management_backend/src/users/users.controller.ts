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

  @Get('users')
  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return this.userServices.getUserBylogin(req.user['login']);
  }

  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userServices.getAll();
  }

  @Post('/username')
  @UseGuards(JwtAuthGuard)
  setUserName(@Req() req) {
    this.userServices.updateUsername(req.user['login'], req.body['username']);
  }

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() image: Express.Multer.File, @Req() req) {
    this.userServices.updateAvatarUrl(req.user['login'], image['filename']);
  }

  @Get(':imgPath')
  getAvatar(@Param('imgPath') image, @Res() res) {
    res.sendFile(image, { root: './src/uploads' });
  }
}
