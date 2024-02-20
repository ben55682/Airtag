import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRegisterDto } from 'src/common/dto/user/user-register.dto';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UserService } from './user.service';
import { UserSignupDto } from 'src/common/dto/user/user-signup.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('signIn')
  public signIn(@Body() userRegister: UserRegisterDto): Promise<UserDto> {
    return this._userService.signIn(userRegister);
  }

  @Post('signUp')
  public signUp(@Body() userRegister: UserRegisterDto): Promise<UserSignupDto> {
    return this._userService.signUp(userRegister);
  }
}
