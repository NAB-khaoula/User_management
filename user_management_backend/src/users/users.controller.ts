import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';

const editfilename = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/))
    callback(
      new HttpException('Bad file extension!', HttpStatus.BAD_REQUEST),
      false,
    );
  else
    callback(
      null,
      Date.now() + '-' + req.user['login'] + '.' + file.originalname,
    );
};
@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    return this.userServices.getUserBylogin(req.user['login']);
  }

  @Get('users')
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads',
        filename: editfilename,
      }),
    }),
  )
  async uploadFile(@UploadedFile() image: Express.Multer.File, @Req() req) {
    if (image) {
      const updateUser = await this.userServices.getUserBylogin(
        req.user['login'],
      );
      console.log(image);
      if (updateUser)
        return this.userServices.updateAvatarUrl(
          await updateUser,
          image['filename'],
        );
    }
    throw new UnauthorizedException();
  }
}
