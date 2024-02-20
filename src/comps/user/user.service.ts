import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from 'src/common/dto/user/user-register.dto';
import { UserDto } from 'src/common/dto/user/user.dto';
import { User, UserDocument } from 'src/common/schema/user.schema';
import { UserSignupDto } from 'src/common/dto/user/user-signup.dto';
import { MsgDto } from 'src/common/dto/msg/msg.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<UserDocument>,
  ) {}

  public async signIn(userRegister: UserRegisterDto): Promise<UserDto> {
    const user: UserDocument = await this._userModel
      .findOne({
        username: userRegister.username,
      })
      .exec();
    if (user.password !== userRegister.password) {
      throw new UnauthorizedException('invalid email or password');
    }
    const userDto: UserDto = {
      username: user.username,
      id: user._id,
      airtagID: user.airtagID,
    };
    return userDto;
  }

  public signUp(userRegister: UserRegisterDto): Promise<UserSignupDto> {
    const user: User = {
      username: userRegister.username,
      password: userRegister.password,
      airtagID: undefined,
    };
    return this._userModel.create(user).then((userRes) => {
      return {
        id: userRes._id,
        username: userRes.username,
      };
    });
  }

  public assignAirtag(airtagId: string, userId: string): Promise<MsgDto> {
    return this._userModel
      .findByIdAndUpdate(userId, { airtagID: airtagId })
      .then(() => {
        return { message: 'Airtag Assigned!!' };
      });
  }
}
