import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserDto } from 'src/intra-auth/dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post('signin')
  signin(@Body() dto: UserDto) {
    console.log(dto);
  }
  @Get(':usrName')
  async getUserByuserName(@Res() res, @Param('usrName') params) {
    try {
      const userObj = await this.userServices.getUserByUserName(params);
      return res.status(HttpStatus.OK).json({
        id: userObj.id,
        userName: userObj.userName,
      });
    } catch (error) {
      console.log('The error is: ', error);
    }
  }
}
