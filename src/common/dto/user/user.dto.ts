import * as mongoose from 'mongoose';

export interface UserDto {
  id: string;
  username: string;
  airtagID: mongoose.Schema.Types.ObjectId;
}
