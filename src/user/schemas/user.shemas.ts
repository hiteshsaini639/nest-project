import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop()
//   name: string;

//   @Prop()
//   email: string;

//   @Prop()
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
