import * as mongoose from 'mongoose';

export interface UserSignupDto {
  username: string;
  id: mongoose.Schema.Types.ObjectId;
}
