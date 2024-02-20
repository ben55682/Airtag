import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AirtagDocument = Airtag & Document;

@Schema()
export class Airtag {
  @Prop({ unique: true })
  airtagId: number;

  @Prop()
  name: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;
}

export const AirtagSchema = SchemaFactory.createForClass(Airtag);
