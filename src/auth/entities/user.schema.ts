import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    default: uuid,
    unique: true,
  })
  uuid: string;
  @Prop({
    type: String,
    unique: true,
    index: true,
  })
  email: string;
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ default: true })
  IsActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
