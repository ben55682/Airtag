import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Airtag } from './airtag.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  airtagID: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
