import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post('signin')
  signin(@Body() dto: UserDto) {
    console.log(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get(':usrName')
  // async getUserByuserName(@Res() res, @Param('usrName') params) {
  //   try {
  //     const userObj = await this.userServices.getUserByUserName(params);
  //     return res.status(HttpStatus.OK).json({
  //       id: userObj.id,
  //       userName: userObj.userName,
  //     });
  //   } catch (error) {
  //     console.log('The error is: ', error);
  //   }
  // }
}
